export function initThankYouPage() {
    const params = new URLSearchParams(window.location.search);
    const data = {
        firstName: params.get('firstName') || '',
        lastName: params.get('lastName') || '',
        orgTitle: params.get('orgTitle') || '',
        email: params.get('email') || '',
        phone: params.get('phone') || '',
        orgName: params.get('orgName') || '',
        level: params.get('level') || '',
        description: params.get('description') || '',
        timestamp: params.get('timestamp') || ''
    };

    const container = document.getElementById('submitted-data');

    const levelLabel = data.level
        ? data.level.charAt(0).toUpperCase() + data.level.slice(1)
        : '—';

    const when = data.timestamp
        ? new Date(data.timestamp).toLocaleString()
        : '—';

    container.innerHTML = `
    <dl>
      <dt>Name:</dt><dd>${data.firstName} ${data.lastName}</dd>
      <dt>Title:</dt><dd>${data.orgTitle}</dd>
      <dt>Email:</dt><dd><a href="mailto:${data.email}">${data.email}</a></dd>
      <dt>Phone:</dt><dd>${data.phone}</dd>
      <dt>Organization:</dt><dd>${data.orgName}</dd>
      <dt>Membership Level:</dt><dd>${levelLabel}</dd>
      <dt>About Your Organization:</dt><dd>${data.description}</dd>
      <dt>Submitted At:</dt><dd>${when}</dd>
    </dl>

    <p>We’ll be in touch soon—thank you for joining the Anaheim Chamber!</p>
  `;
}
