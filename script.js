/* script.js — interactions: modal, toast, approve/reject/cancel, small UI helpers */

/* Modal helpers */
function openModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.add('show');
  // focus first focusable element
  setTimeout(()=> {
    const focusable = el.querySelector('button, [href], input, select, textarea');
    if(focusable) focusable.focus();
  }, 80);
}
function closeModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.remove('show');
}

/* Toast */
function showToast(msg, timeout = 3500){
  let t = document.getElementById('__proto_toast');
  if(!t){
    t = document.createElement('div'); t.id='__proto_toast'; t.className='toast'; document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), timeout);
}

/* Apply flow simulation */
function submitApplySim(){
  closeModal('confirmModal');
  showToast('Leave request submitted — Pending approval by Ravi Kumar.');
  // optionally redirect to history page after a short delay
  setTimeout(()=> window.location.href = 'history.html', 900);
}

/* Row actions (simulate) */
function cancelRequest(id){
  if(!confirm('Cancel this leave request?')) return;
  const row = document.getElementById(id);
  if(row){
    const badge = row.querySelector('.badge-pending, .badge-approved, .badge-rejected') || row.querySelector('.badge');
    if(badge){ badge.className = 'badge badge-cancelled'; badge.textContent = 'CANCELLED'; }
    showToast('Leave cancelled.');
  }
}
function approveRow(id){
  if(!confirm('Approve this leave request?')) return;
  const row = document.getElementById(id);
  if(row){
    const badge = row.querySelector('.badge');
    if(badge){ badge.className = 'badge badge-approved'; badge.textContent = 'APPROVED'; }
    showToast('Leave approved.');
  }
}
function rejectRow(id){
  const reason = prompt('Reason for rejection (this will be sent to the employee):');
  if(!reason) return;
  const row = document.getElementById(id);
  if(row){
    const badge = row.querySelector('.badge');
    if(badge){ badge.className = 'badge badge-rejected'; badge.textContent = 'REJECTED'; }
    showToast('Leave rejected. Employee notified.');
  }
}

/* Confirmation modal KV update (apply page) */
function updateConfirmPreview(){
  const type = document.getElementById('leaveType')?.value || '—';
  const start = document.getElementById('startDate')?.value || '—';
  const end = document.getElementById('endDate')?.value || '—';
  document.getElementById('kv-type') && (document.getElementById('kv-type').textContent = type);
  document.getElementById('kv-dates') && (document.getElementById('kv-dates').textContent = `${start} to ${end}`);
  if(document.getElementById('kv-days')){
    if(start !== '—' && end !== '—'){
      const days = (new Date(end) - new Date(start))/(1000*60*60*24) + 1;
      document.getElementById('kv-days').textContent = days;
    } else {
      document.getElementById('kv-days').textContent = '—';
    }
  }
}

/* Attach listeners when ready */
document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  const type = document.getElementById('leaveType');
  if(start) start.addEventListener('change', updateConfirmPreview);
  if(end) end.addEventListener('change', updateConfirmPreview);
  if(type) type.addEventListener('change', updateConfirmPreview);
});
