const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    console.log(data.data);

    const tabsContainer = document.getElementById('tabs-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category.category_id}')" class="btn w-[104px] tab bg-[#25252526]">${category.category}</a>
        `;
        tabsContainer.appendChild(div);
    })

}



const handleLoadCategory = async (id) => {
    console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
}
handleCategory();