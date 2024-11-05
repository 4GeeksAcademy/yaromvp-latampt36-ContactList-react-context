const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contactInfo: [{}], //Información del contacto
			editValue: false, //Variable para verificar si se desea editar un contacto
			editInfo: {} //Variable para guardar la información que se desea modificar
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createAgenda: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/yaromvp', {
						method: "POST",
						header: { 'Content-type': 'Application/json' }
					}
					)
					if (response.status !== 201) {
						throw new Error(`Error en la solicitud: status code ${response.status}`)
					}
					return true
				} catch (error) {
					console.log(error)
					return false
				}
			},
			getAgenda: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/yaromvp')
					if (response.status != 200) {
						getActions().createAgenda()
						throw new Error('Error en la solicitud...')
					}
					const agendaData = await response.json()
					setStore({
						contactInfo: agendaData
					})
				} catch (error) {

					console.log(error)
				}
			},
			getEditInfo: (id, name, address, phone, email) => {
				setStore({
					editInfo: {
						id: id,
						name: name,
						address: address,
						phone: phone,
						email: email,
					}
				})
			}
		}
	};
};

export default getState;
