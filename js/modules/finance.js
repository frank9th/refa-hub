/**
 * Live Finance Dashboard Logic
 * Tracks real-time revenue and expenses via Firestore.
 */

// let activeEvent = null; (removed to prevent redeclaration error)
let allTransactions = [];
const FINANCIAL_TARGET = 4000000;

window.addEventListener('firebase-ready', () => {
  if (window.REFA_EVENTS) {
    const activeEvent = window.REFA_EVENTS.getActiveEvent();
    if (activeEvent) {
      initFinance(activeEvent);
    }
  }
});

function initFinance(activeEvent) {
  if (!activeEvent || !activeEvent.id) return;
  
  if (window.REFA_FIREBASE && window.REFA_FIREBASE.subscribeToFinance) {
    window.REFA_FIREBASE.subscribeToFinance(activeEvent.id, (transactions) => {
      // Sort by creation date descending
      allTransactions = transactions.sort((a, b) => {
        const timeA = a.createdAt ? (a.createdAt.toMillis ? a.createdAt.toMillis() : Date.parse(a.createdAt)) : 0;
        const timeB = b.createdAt ? (b.createdAt.toMillis ? b.createdAt.toMillis() : Date.parse(b.createdAt)) : 0;
        return timeB - timeA;
      });
      renderFinanceDashboard();
    });
  } else {
    console.warn("Firestore finance sync not available.");
  }
}

function renderFinanceDashboard() {
  let totalRev = 0;
  let totalExp = 0;

  const tbody = document.getElementById('finance-ledger-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  allTransactions.forEach(t => {
    const amount = Number(t.amount) || 0;
    if (t.type === 'income') {
      totalRev += amount;
    } else {
      totalExp += amount;
    }

    const dateStr = t.createdAt 
      ? new Date(t.createdAt.toMillis ? t.createdAt.toMillis() : t.createdAt).toLocaleDateString() 
      : 'Just now';

    const typeColor = t.type === 'income' ? '#10b981' : '#ef4444';
    const typeLabel = t.type === 'income' ? 'INCOME' : 'EXPENSE';
    
    tbody.innerHTML += `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 16px; color: rgba(255,255,255,0.7);">${dateStr}</td>
        <td style="padding: 16px;">
          <span style="font-size:10px; background:rgba(255,255,255,0.1); color:${typeColor}; padding:4px 8px; border-radius:4px; font-weight:700;">${typeLabel}</span>
        </td>
        <td style="padding: 16px; color: #fff;">${t.description}</td>
        <td style="padding: 16px; text-align: right; font-weight: 700; color: ${typeColor};">
          ${t.type === 'income' ? '+' : '-'}₦${amount.toLocaleString()}
        </td>
      </tr>
    `;
  });

  const netProfit = totalRev - totalExp;
  const pct = Math.min(100, Math.round((totalRev / FINANCIAL_TARGET) * 100));

  document.getElementById('fin-total-revenue').textContent = `₦${totalRev.toLocaleString()}`;
  document.getElementById('fin-total-expenses').textContent = `₦${totalExp.toLocaleString()}`;
  
  const netEl = document.getElementById('fin-net-profit');
  netEl.textContent = `₦${netProfit.toLocaleString()}`;
  netEl.style.color = netProfit >= 0 ? '#3b82f6' : '#ef4444';
  
  document.getElementById('fin-target-pct').textContent = `${pct}%`;
}

async function logFinanceTransaction(e) {
  if (e) e.preventDefault();
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  if (!activeEvent || !activeEvent.id) {
    alert("No active event selected.");
    return;
  }

  const type = document.getElementById('fin-type').value;
  const description = document.getElementById('fin-desc').value.trim();
  const amountStr = document.getElementById('fin-amount').value;
  const amount = Number(amountStr);

  if (!description || !amount || amount <= 0) {
    alert("Please provide a valid description and amount.");
    return;
  }

  const transactionData = {
    type,
    description,
    amount
  };

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.addFinanceTransaction) {
    const res = await window.REFA_FIREBASE.addFinanceTransaction(activeEvent.id, transactionData);
    if (res.success) {
      document.getElementById('fin-desc').value = '';
      document.getElementById('fin-amount').value = '';
      document.getElementById('finance-modal').style.display = 'none';
      // UI updates automatically via snapshot listener
    } else {
      alert("Error logging transaction: " + res.error);
    }
  }
}

window.logFinanceTransaction = logFinanceTransaction;
