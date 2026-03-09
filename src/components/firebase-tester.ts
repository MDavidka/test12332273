import { initializeApp, deleteApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, limit, serverTimestamp } from 'firebase/firestore';

/**
 * Renders the Firebase Connection Diagnostic Tool.
 * Provides a UI to input Firebase configuration and runs read/write tests against Firestore.
 * 
 * @param container - The DOM element to mount the component into.
 */
export function renderFirebaseTester(container: HTMLElement): void {
  // 1. Inject the Component HTML
  container.innerHTML = `
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">
      <!-- Configuration Card -->
      <div class="card w-full max-w-none">
        <div class="flex items-center gap-3 mb-2">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
          </svg>
          <h2 class="text-2xl font-heading font-semibold text-primary">Firebase Diagnostic Tool</h2>
        </div>
        <p class="text-sm text-muted mb-6">Paste your Firebase configuration object below to verify database connectivity and read/write permissions.</p>
        
        <div class="relative mb-6">
          <textarea 
            id="fb-config-input" 
            class="input-field font-mono text-xs h-48 resize-y w-full bg-gray-50 dark:bg-gray-900" 
            spellcheck="false"
            placeholder='const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "your-app.firebaseapp.com",\n  projectId: "your-app",\n  storageBucket: "your-app.appspot.com",\n  messagingSenderId: "123456789",\n  appId: "1:123456789:web:abcdef"\n};'
          ></textarea>
        </div>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-muted">System Status:</span>
            <span id="fb-status-badge" class="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-300"></span>
          </div>
          <button id="fb-run-btn" class="btn-primary w-full sm:w-auto px-8 py-2.5">
            Run Diagnostic Test
          </button>
        </div>
      </div>

      <!-- Terminal Output -->
      <div class="rounded-xl overflow-hidden shadow-2xl flex flex-col border border-gray-800 bg-[#0d1117]">
        <div class="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span class="ml-3 text-xs font-mono text-gray-400 select-none">firebase-diagnostic ~ /bin/bash</span>
          </div>
          <button id="fb-clear-btn" class="text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono">
            [ clear ]
          </button>
        </div>
        <div id="fb-terminal-output" class="p-5 h-96 overflow-y-auto font-mono text-sm space-y-1.5 scroll-smooth">
          <!-- Logs injected here -->
        </div>
      </div>
    </div>
  `;

  // 2. Query DOM Elements
  const configInput = container.querySelector('#fb-config-input') as HTMLTextAreaElement;
  const runBtn = container.querySelector('#fb-run-btn') as HTMLButtonElement;
  const clearBtn = container.querySelector('#fb-clear-btn') as HTMLButtonElement;
  const statusBadge = container.querySelector('#fb-status-badge') as HTMLSpanElement;
  const terminalOutput = container.querySelector('#fb-terminal-output') as HTMLDivElement;

  if (!configInput || !runBtn || !statusBadge || !terminalOutput || !clearBtn) {
    console.error('Firebase Tester: Failed to initialize DOM elements.');
    return;
  }

  // 3. State & Helpers
  let isRunning = false;

  type Status = 'idle' | 'running' | 'success' | 'error';
  type LogType = 'info' | 'success' | 'error' | 'warning';

  const updateStatus = (status: Status) => {
    statusBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors duration-300';
    
    switch (status) {
      case 'idle':
        statusBadge.classList.add('bg-gray-100', 'text-gray-600', 'border-gray-200', 'dark:bg-gray-800', 'dark:text-gray-400', 'dark:border-gray-700');
        statusBadge.textContent = 'Idle';
        break;
      case 'running':
        statusBadge.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-200', 'dark:bg-blue-900/50', 'dark:text-blue-400', 'dark:border-blue-800');
        statusBadge.textContent = 'Testing...';
        break;
      case 'success':
        statusBadge.classList.add('bg-green-100', 'text-green-700', 'border-green-200', 'dark:bg-green-900/50', 'dark:text-green-400', 'dark:border-green-800');
        statusBadge.textContent = 'Connected';
        break;
      case 'error':
        statusBadge.classList.add('bg-red-100', 'text-red-700', 'border-red-200', 'dark:bg-red-900/50', 'dark:text-red-400', 'dark:border-red-800');
        statusBadge.textContent = 'Failed';
        break;
    }
  };

  const addLog = (message: string, type: LogType = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logEl = document.createElement('div');
    logEl.className = 'flex items-start gap-3 break-words';
    
    let colorClass = 'text-gray-300';
    let icon = '<span class="text-blue-400">ℹ</span>';
    
    if (type === 'success') {
      colorClass = 'text-green-400';
      icon = '<span class="text-green-500">✓</span>';
    } else if (type === 'error') {
      colorClass = 'text-red-400';
      icon = '<span class="text-red-500">✗</span>';
    } else if (type === 'warning') {
      colorClass = 'text-yellow-400';
      icon = '<span class="text-yellow-500">⚠</span>';
    }

    logEl.innerHTML = `
      <span class="text-gray-600 shrink-0">[${time}]</span> 
      <span class="shrink-0 w-4 text-center">${icon}</span>
      <span class="${colorClass} flex-1">${message}</span>
    `;
    
    terminalOutput.appendChild(logEl);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  const parseConfig = (input: string): any => {
    const trimmed = input.trim();
    if (!trimmed) throw new Error("Configuration is empty.");

    try {
      // First, try strict JSON parsing
      return JSON.parse(trimmed);
    } catch (e) {
      try {
        // Fallback: Attempt to parse JS object literal (common when copying from Firebase console)
        // Extract the object part if they copied the variable declaration too
        const match = trimmed.match(/\{[\s\S]*\}/);
        if (match) {
          // Using Function constructor to safely evaluate the object literal string
          return new Function(`return ${match[0]}`)();
        }
        throw new Error("No object structure found.");
      } catch (err) {
        throw new Error("Invalid format. Please provide valid JSON or a JavaScript object literal.");
      }
    }
  };

  // Initialize UI State
  updateStatus('idle');
  addLog('System ready. Awaiting configuration...', 'info');

  // 4. Core Diagnostic Logic
  const runDiagnostic = async () => {
    if (isRunning) return;
    
    let config;
    try {
      config = parseConfig(configInput.value);
    } catch (err: any) {
      addLog(`Parse Error: ${err.message}`, 'error');
      updateStatus('error');
      return;
    }

    // Lock UI
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Running...
    `;
    updateStatus('running');
    terminalOutput.innerHTML = ''; // Clear previous logs
    addLog('Starting diagnostic sequence...', 'info');

    let app: FirebaseApp | null = null;

    try {
      // Step 1: Initialize App
      addLog('Initializing Firebase App...', 'info');
      const appName = `DiagnosticApp-${Date.now()}`;
      app = initializeApp(config, appName);
      addLog(`App initialized successfully. (Project: ${config.projectId || 'Unknown'})`, 'success');

      // Step 2: Connect to Firestore
      addLog('Connecting to Firestore...', 'info');
      const db = getFirestore(app);
      addLog('Firestore instance retrieved.', 'success');

      const testCollection = collection(db, '_diagnostic_tests');
      
      // Step 3: Test Write Operation
      addLog('Attempting WRITE operation...', 'info');
      const docRef = await addDoc(testCollection, {
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        status: 'test_passed',
        note: 'This document was generated by the Firebase Diagnostic Tool.'
      });
      addLog(`WRITE successful! Document ID: ${docRef.id}`, 'success');

      // Step 4: Test Read Operation
      addLog('Attempting READ operation...', 'info');
      const q = query(testCollection, limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        addLog(`READ successful! Retrieved ${querySnapshot.size} document(s).`, 'success');
      } else {
        addLog('READ completed, but collection is empty (unexpected).', 'warning');
      }

      // Success
      addLog('Diagnostic sequence completed successfully. Connection is fully operational.', 'success');
      updateStatus('success');

    } catch (error: any) {
      // Handle Errors
      addLog(`Operation failed: ${error.message || error}`, 'error');
      if (error.code) {
        addLog(`Firebase Error Code: ${error.code}`, 'error');
      }
      updateStatus('error');
    } finally {
      // Step 5: Cleanup
      if (app) {
        try {
          addLog('Cleaning up Firebase instance...', 'info');
          await deleteApp(app);
          addLog('Cleanup complete. Ready for next test.', 'info');
        } catch (cleanupError) {
          addLog('Failed to clean up Firebase instance.', 'warning');
        }
      }
      
      // Unlock UI
      isRunning = false;
      runBtn.disabled = false;
      runBtn.textContent = 'Run Diagnostic Test';
    }
  };

  // 5. Attach Event Listeners
  runBtn.addEventListener('click', runDiagnostic);
  
  clearBtn.addEventListener('click', () => {
    terminalOutput.innerHTML = '';
    addLog('Terminal cleared.', 'info');
    if (!isRunning) updateStatus('idle');
  });
}