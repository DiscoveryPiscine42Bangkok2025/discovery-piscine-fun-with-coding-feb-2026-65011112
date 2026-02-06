// ฟังก์ชันสำหรับสลับข้อมูลสมาชิก
function switchMember(memberClass, memberName) {
    // 1. ซ่อนเนื้อหาทั้งหมดก่อน (เพิ่ม class d-none)
    var allContent = document.querySelectorAll('.member-content');
    allContent.forEach(function(el) { 
        el.classList.add('d-none'); 
    });

    // 2. แสดงเฉพาะเนื้อหาของ member ที่เลือก (ลบ class d-none)
    var selectedContent = document.querySelectorAll('.' + memberClass);
    selectedContent.forEach(function(el) { 
        el.classList.remove('d-none'); 
    });

    // 3. เปลี่ยนชื่อที่แสดงบนปุ่ม Dropdown
    document.getElementById('currentMemberName').textContent = memberName;
}
window.addEventListener('DOMContentLoaded', function () {
    // ซ่อน member ทั้งหมดก่อน
    document.querySelectorAll('.member-content').forEach(function (el) {
        el.classList.add('d-none');
    });

    const params = new URLSearchParams(window.location.search);
    const member = params.get('member');

    if (member === 'member1') {
        switchMember('member1', 'สิริโรจน์ (Member 1)');
    } else if (member === 'member2') {
        switchMember('member2', 'ปฐมพร (Member 2)');
    } else {
        // fallback: ถ้าเข้า index.html ตรง ๆ
        switchMember('member1', 'สิริโรจน์ (Member 1)');
    }
});
