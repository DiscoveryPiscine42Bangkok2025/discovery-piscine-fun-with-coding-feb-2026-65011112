$(document).ready(function() {
    const $ftList = $('#ft_list');

    // ฟังก์ชันโหลดข้อมูลจาก Cookie เมื่อเปิดหน้าเว็บ
    function loadTodos() {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookies) {
            const todos = JSON.parse(decodeURIComponent(cookies.split('=')[1]));
            // ใส่รายการกลับเข้าไป (วนจากท้ายมาหน้าเพื่อให้ลำดับบนสุดถูกต้อง)
            todos.reverse().forEach(text => addTodo(text, false));
        }
    }

    // ฟังก์ชันบันทึกลง Cookie
    function saveTodos() {
        const todos = [];
        $ftList.find('div').each(function() {
            todos.push($(this).text());
        });
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=604800";
    }

    // ฟังก์ชันเพิ่มรายการ (ใช้ jQuery DOM manipulation)
    function addTodo(text, shouldSave = true) {
        if (!text || text.trim() === "") return;

        const $div = $('<div></div>').text(text);
        
        // ลบรายการเมื่อคลิก (Confirm)
        $div.on('click', function() {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $ftList.prepend($div); // เพิ่มไว้บนสุด
        if (shouldSave) saveTodos();
    }

    // เมื่อกดปุ่ม New
    $('#new_btn').on('click', function() {
        const task = prompt("Add a new TO DO:");
        addTodo(task);
    });

    loadTodos();
});