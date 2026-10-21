// Base de Dados Global em Memória
const globalStudentsData = {
    natan: { name: "NATHAN RAMOS MACEDO", tag: "6C 29 16 06", photo: "Natan.jpg", locker: "Armário 01", role: "Desenvolvedor" },
    joao: { name: "JOÃO VICTOR SANTOS MOREIRA", tag: "1A BF F3 E1", photo: "", locker: "Armário 02", role: "Usuário Comum" },
    erick: { name: "ERICK JESUS DOS SANTOS REIS", tag: "0C B7 6A 06", photo: "erick.jpg", locker: "Armário 02", role: "Usuário Comum" }
};

let isKillActive = false;

// Troca de Abas do Menu Lateral
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
    if(element) element.classList.add('active');
}

// Ativação do Kill Switch
function toggleKillSwitch() {
    isKillActive = !isKillActive;
    const btn = document.getElementById("globalKillBtn");
    
    if(isKillActive) {
        btn.className = "btn btn-secondary";
        btn.innerHTML = `<i class="fa-solid fa-unlock"></i> Desativar Bloqueio`;
        alert("KILL SWITCH ATIVADO: Todas as permissões foram suspensas!");
    } else {
        btn.className = "btn btn-danger";
        btn.innerHTML = `<i class="fa-solid fa-lock"></i> Bloquear Todas as Tags`;
        alert("Sistema de tags reativado.");
    }
}

// Simulação de Leitura RFID por Ondas Magnéticas
function simulateProximityCapture() {
    const wrapper = document.getElementById("wavesWrapper");
    const statusText = document.getElementById("secReaderStatus");

    wrapper.classList.add("scanning");
    statusText.style.color = "var(--primary)";
    statusText.textContent = "Emitindo Ondas Magnéticas de 13.56 MHz...";

    setTimeout(() => {
        const generatedUid = "A4 " + Math.floor(Math.random()*89+10) + " " + Math.floor(Math.random()*89+10) + " " + Math.floor(Math.random()*89+10);
        document.getElementById("secStudentUid").value = generatedUid;
        
        wrapper.classList.remove("scanning");
        statusText.style.color = "var(--success)";
        statusText.textContent = "UID Capturada com Sucesso via Sinal RFID!";
    }, 1500);
}

// Registo de Nova Tag
function commitNewTagRegistration() {
    const name = document.getElementById("secStudentName").value;
    const uid = document.getElementById("secStudentUid").value;
    
    if(!name || !uid) {
        alert("Aproxime uma tag no sensor e digite o nome do aluno!");
        return;
    }

    const tbody = document.getElementById("secStudentsTable");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><strong>${name}</strong></td><td><code>${uid}</code></td><td>Armário 01</td><td><span class="status-badge closed"><i class="fa-solid fa-circle-check"></i> Ativo</span></td><td><button class="btn btn-sm btn-danger" onclick="toggleTagStatus(this)">Revogar</button></td>`;
    tbody.appendChild(tr);

    alert(`Credencial de ${name} cadastrada com sucesso!`);
    document.getElementById("secStudentName").value = "";
    document.getElementById("secStudentUid").value = "";
    
    const statusText = document.getElementById("secReaderStatus");
    statusText.style.color = "var(--text-muted)";
    statusText.textContent = "Leitor Em Espera - Clique para Acomodar Tag";
}

// Alternar Status da Tag (Revogar / Reativar)
function toggleTagStatus(btn) {
    const row = btn.closest("tr");
    const badge = row.querySelector(".status-badge");

    if (badge.classList.contains("closed")) {
        badge.className = "status-badge violation";
        badge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Revogado`;
        btn.className = "btn btn-sm btn-success";
        btn.textContent = "Reativar";
        alert("Tag revogada com sucesso.");
    } else {
        badge.className = "status-badge closed";
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Ativo`;
        btn.className = "btn btn-sm btn-danger";
        btn.textContent = "Revogar";
        alert("Tag reativada com sucesso.");
    }
}

// Pesquisa/Filtro na Tabela de Alunos
function filterStudentsTable() {
    const input = document.getElementById("searchStudentInput").value.toLowerCase();
    const rows = document.querySelectorAll("#secStudentsTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// Inicialização do Gráfico Chart.js
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('secAnalyticsChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['07:30 (Entrada)', '09:50 (Intervalo)', '12:00 (Almoço)', '15:20 (Intervalo)', '17:40 (Saída)'],
                datasets: [{
                    label: 'Tentativas de Acesso Registradas',
                    data: [42, 85, 30, 94, 51],
                    backgroundColor: '#a855f7',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#8b9bb4' } } },
                scales: {
                    x: { ticks: { color: '#8b9bb4' }, grid: { color: '#1a2336' } },
                    y: { ticks: { color: '#8b9bb4' }, grid: { color: '#1a2336' } }
                }
            }
        });
    }
});