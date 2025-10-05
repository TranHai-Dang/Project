document.addEventListener("DOMContentLoaded", () => {
    const q2 = document.getElementById('q2');
    const q3 = document.getElementById('q3');
    const q4 = document.getElementById('q4');
    const q5 = document.getElementById('q5');
    const ageSelect = document.getElementById("age");
    if (ageSelect) {
        const maxAge = 120;
        for (let i = 1; i <= maxAge; i++) {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = i;
            ageSelect.appendChild(opt);
        }
    }
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value, 10);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const ID = document.getElementById('ID').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const building = q2.value;
        const floor = q3.value;
        const room = q4.value;
        const bed = q5.value;
        if (!name || !age || !gender || !address || !building || !floor || !room || !bed) {
            alert("Vui lòng điền đầy đủ thông tin."); 
            return;
        }
        fetch('10:136:240:82/api/submit', { // IP của thiết bị host server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, gender, ID, phone, address, building, floor, room, bed })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Phản hồi mạng không ổn định");
            }
            return response.json();
        })
        .then(data => {
            alert("Thông tin đã được gửi thành công!");
        })
        .catch(error => {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Đã có lỗi xảy ra khi gửi thông tin.");
        });
    });
    const data = {
        A: {
            1: { "101": ["Giường 1", "Giường 2", "Giường 3"], "102": ["Giường 1", "Giường 2", "Giường 3"], "103": ["Giường 1", "Giường 2", "Giường 3"] },
            2: { "201": ["Giường 1", "Giường 2", "Giường 3"], "202": ["Giường 1", "Giường 2", "Giường 3"], "203": ["Giường 1", "Giường 2", "Giường 3"] },
            3: { "301": ["Giường 1", "Giường 2", "Giường 3"], "302": ["Giường 1", "Giường 2", "Giường 3"], "303": ["Giường 1", "Giường 2", "Giường 3"] }
        },
        B: {
            1: { "111": ["Giường 1", "Giường 2", "Giường 3"], "112": ["Giường 1", "Giường 2", "Giường 3"], "113": ["Giường 1", "Giường 2", "Giường 3"] },
            2: { "211": ["Giường 1", "Giường 2", "Giường 3"], "212": ["Giường 1", "Giường 2", "Giường 3"], "213": ["Giường 1", "Giường 2", "Giường 3"] },
            3: { "311": ["Giường 1", "Giường 2", "Giường 3"], "312": ["Giường 1", "Giường 2", "Giường 3"], "313": ["Giường 1", "Giường 2", "Giường 3"] }
        },
        C: {
            1: { "121": ["Giường 1", "Giường 2", "Giường 3"], "122": ["Giường 1", "Giường 2", "Giường 3"], "123": ["Giường 1", "Giường 2", "Giường 3"] },
            2: { "221": ["Giường 1", "Giường 2", "Giường 3"], "222": ["Giường 1", "Giường 2", "Giường 3"], "223": ["Giường 1", "Giường 2", "Giường 3"] },
            3: { "321": ["Giường 1", "Giường 2", "Giường 3"], "322": ["Giường 1", "Giường 2", "Giường 3"], "323": ["Giường 1", "Giường 2", "Giường 3"] }
        }
    };
    Object.keys(data).forEach(building => {
        const opt = document.createElement('option');
        opt.value = building;
        opt.textContent = "Tòa " + building;
        q2.appendChild(opt);
    });
    q2.addEventListener("change", () => {
        const building = q2.value;
        q3.innerHTML = '<option value="">-- Chọn tầng --</option>';
        Object.keys(data[building]).forEach(floor => {
            const opt = document.createElement('option');
            opt.value = floor;
            opt.textContent = "Tầng " + floor;
            q3.appendChild(opt);
        });
    });
    q3.addEventListener("change", () => {
        const building = q2.value;
        const floor = q3.value;
        q4.innerHTML = '<option value="">-- Chọn phòng --</option>';
        Object.keys(data[building][floor]).forEach(room => {
            const opt = document.createElement('option');
            opt.value = room;
            opt.textContent = "Phòng " + room;
            q4.appendChild(opt);
        });
    });
    q4.addEventListener("change", () => {
        const building = q2.value;
        const floor = q3.value;
        const room = q4.value;
        q5.innerHTML = '<option value="">-- Chọn giường --</option>';
        data[building][floor][room].forEach(bed => {
            const opt = document.createElement('option');
            opt.value = bed;
            opt.textContent = bed;
            q5.appendChild(opt);
        });
    });
});


