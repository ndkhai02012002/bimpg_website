function loadInformationClient() {
    fetch(`/api/admin/get-all-information-client`, {
        method: 'POST',
    }).then(response => response.json())
        .then((data) => {
            const body_table_information = document.getElementById('body-table-manager')
            data.forEach((element, index) => {
                const tr = document.createElement('tr')
                const th = document.createElement('th')
                th.innerHTML = index
                th.scope = "row"
                const td_fullname = document.createElement('td')
                td_fullname.innerHTML = element.fullname
                const td_email = document.createElement('td')
                td_email.innerHTML = element.email
                const td_contact = document.createElement('td')
                td_contact.innerHTML = element.contact
                const td_birth = document.createElement('td')
                td_birth.innerHTML = element.birth
                const td_city = document.createElement('td')
                td_city.innerHTML = element.city
                const td_active = document.createElement('td')
                td_active.innerHTML = element.active
                const td_national = document.createElement('td')
                td_national.innerHTML = element.national
                const td_more = document.createElement('td')
                td_more.innerHTML = element.more

                tr.append(th)
                tr.append(td_fullname)
                tr.append(td_email)
                tr.append(td_contact)
                tr.append(td_birth)
                tr.append(td_city)
                tr.append(td_active)
                tr.append(td_national)
                tr.append(td_more)

                body_table_information.append(tr)
            })
        }).catch((error) => {
            console.error('Error:', error);
        });
} 