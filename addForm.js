addBtn.addEventListener("click", e => {
	mdBox.style.display = "flex";
})
mdClose.addEventListener("click", e => {
	mdBox.style = null;
})

addForm.addEventListener("submit", e => {
	e.preventDefault();
	const body = {};
	
	for (let i=0; i<addForm.elements.length; i++) {
		const inp = addForm.elements[i];
		if (inp.name) {
			if (inp.type === "checkbox") {
				body[inp.name]=inp.checked;
			} else {
				body[inp.name]=inp.value;
			}
		}
	}
	fetch(path+"/add", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})
	.then(res => {
		if(res.ok) {
			addForm.reset();
			mdBox.style = null;
			createCard(body);
		} else {
			return res.text();
		}
	})
	.then(err => {
		if(err && err.message) {
			alert(err.message);
		};
	});
})