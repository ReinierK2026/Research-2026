/* ============================================
   Research-2026 Dashboard JavaScript
   Auto-fetches and renders research_log.json
   ============================================ */

const DATA_URL = '../data/research_log.json';
const REFRESH_INTERVAL = 30000; // 30 seconds
const AGENT_EMOJIS = {
    'web-researcher': '🌐',
    'academic-researcher': '🎓',
    'data-analyst': '📊',
    'technical-researcher': '⚙️',
    'research-gap-analysis': '🔍',
    'research-coordinator': '📋',
    'hypothesis-generation': '💡'
};

let researchData = [];

// Format date nicely
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Get agent display name
function getAgentName(agent) {
    return agent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Get agent emoji
function getAgentEmoji(agent) {
    return AGENT_EMOJIS[agent] || '🔬';
}

// Fetch research log
async function fetchResearchLog() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        researchData = await response.json();
        renderDashboard();
        updateLastUpdated();
    } catch (error) {
        console.error('Error fetching research log:', error);
    }
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('lastUpdated').textContent = `${dateStr} at ${timeStr} UTC`;
}

// Render dashboard
function renderDashboard() {
    renderMetrics();
    renderAgentActivity();
    renderSessions();
    renderKeyFindings();
}

// Render metrics
function renderMetrics() {
    // Session count
    document.getElementById('metric-sessions').textContent = researchData.length;
}

// Render agent activity
function renderAgentActivity() {
    const agentCounts = {};
    
    researchData.forEach(session => {
        if (!agentCounts[session.agent]) {
            agentCounts[session.agent] = 0;
        }
        agentCounts[session.agent]++;
    });

    const container = document.getElementById('agentActivity');
    container.innerHTML = '';

    Object.entries(agentCounts).forEach(([agent, count]) => {
        const div = document.createElement('div');
        div.className = 'agent-item';
        div.innerHTML = `
            <div class="agent-emoji">${getAgentEmoji(agent)}</div>
            <div class="agent-name">${getAgentName(agent)}</div>
            <div class="agent-count">${count}</div>
        `;
        container.appendChild(div);
    });
}

// Render recent sessions (last 6)
function renderSessions() {
    const container = document.getElementById('sessionsList');
    container.innerHTML = '';

    const recent = researchData.slice().reverse().slice(0, 6);

    recent.forEach(session => {
        const div = document.createElement('div');
        div.className = 'session-item';

        const topicSlug = session.topic_slug.split('-').join(' ');
        const topicDisplay = topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1);

        let findingsHtml = '';
        if (session.key_findings && session.key_findings.length > 0) {
            findingsHtml = `<div class="session-findings">
                ${session.key_findings.slice(0, 2).map(f => `<span class="finding-tag">${f}</span>`).join('')}
                ${session.key_findings.length > 2 ? `<span class="finding-tag">+${session.key_findings.length - 2} more</span>` : ''}
            </div>`;
        }

        div.innerHTML = `
            <div class="session-header">
                <div>
                    <span class="session-agent">${getAgentEmoji(session.agent)} ${getAgentName(session.agent)}</span>
                </div>
                <span class="session-status">${session.status}</span>
            </div>
            <div class="session-topic">📌 ${topicDisplay}</div>
            <div class="session-date">Pass ${session.pass} • ${formatDate(session.session_date)}</div>
            ${findingsHtml}
        `;
        container.appendChild(div);
    });

    if (researchData.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No sessions yet. Check back soon!</p>';
    }
}

// Render key findings
function renderKeyFindings() {
    const container = document.getElementById('keyFindings');
    container.innerHTML = '';

    let allFindings = [];

    // Collect all findings from most recent sessions
    researchData.slice().reverse().slice(0, 5).forEach(session => {
        if (session.key_findings) {
            allFindings = [...allFindings, ...session.key_findings];
        }
    });

    // Show unique findings (limit to 10)
    const uniqueFindings = [...new Set(allFindings)].slice(0, 10);

    uniqueFindings.forEach(finding => {
        const div = document.createElement('div');
        div.className = 'finding-item';
        div.innerHTML = `<div class="finding-text">✓ ${finding}</div>`;
        container.appendChild(div);
    });

    if (uniqueFindings.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No findings yet. Awaiting research updates.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchResearchLog();
    
    // Refresh every 30 seconds
    setInterval(fetchResearchLog, REFRESH_INTERVAL);
});

// Refresh immediately when page becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        fetchResearchLog();
    }
});