const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// โหลดรายการจาก Cookie เมื่อเปิดหน้าเว็บ
window.onload = function () {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        // ใส่รายการกลับเข้าไป (วนจากท้ายมาหน้าเพื่อให้ลำดับถูกต้อง)
        todos.reverse().forEach(text => addTodo(text, false));
    }
};

// ฟังก์ชันบันทึกลง Cookie
function saveTodos() {
    const todos = [];
    ftList.querySelectorAll('div').forEach(item => {
        todos.push(item.innerText);
    });
    // ตั้งค่า Cookie ให้หมดอายุใน 7 วัน
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=" + (7*24*60*60);
}

// ฟังก์ชันเพิ่ม To-Do เข้าไปในลิสต์
function addTodo(text, shouldSave = true) {
    if (!text || text.trim() === "") return;

    const div = document.createElement('div');
    div.innerText = text;

    // ลบรายการเมื่อคลิก
    div.onclick = function () {
        if (confirm("Do you want to remove this TO DO?")) {
            this.remove();
            saveTodos();
        }
    };

    // เพิ่มไปที่ด้านบนสุด (prepend)
    ftList.prepend(div);
    if (shouldSave) saveTodos();
}

// เมื่อกดปุ่ม New
newBtn.onclick = function () {
    const task = prompt("Add a new TO DO:");
    addTodo(task);
};