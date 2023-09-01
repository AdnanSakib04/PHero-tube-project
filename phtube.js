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
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = "";

    const noContentContainer = document.getElementById('no-content-container');
    noContentContainer.innerHTML = "";

    console.log('--------------length');
    console.log(data.data.length);

    const checkLength = data.data.length;
    if (checkLength > 0) {
        data.data.forEach((x) => {
            console.log(x.thumbnail);
            console.log(x.title);
            console.log(x.authors[0].profile_picture);
            console.log(x.authors[0].profile_name);
            console.log(x.authors[0].verified);
            console.log(x.others.views);
            console.log(x.others.posted_date);

            // calculating the hours and minute
            let totalSeconds = x.others.posted_date;
            const hours = parseInt(totalSeconds / 3600);
            totalSeconds = totalSeconds% 3600;
            const mins = parseInt(totalSeconds / 60);

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
            <!-- card 1 -->
            <div class="card card-compact w-[312px] h-[300px] bg-base-100 shadow-xl relative">
                <figure><img  src="${x.thumbnail}" alt="" /></figure>
                <div class="p-1 my-2">
    
                    <div class="flex flex-row gap-3">
                        <!-- profile picture -->
                        <div class="relative ">
                            <img class="w-[40px] h-[40px] rounded-full" src="${x.authors[0].profile_picture}" alt="">
                            ${x.others.posted_date? `<div class="absolute  -mt-[88px] left-[166px]">
                            <p class="text-white bg-[#171717] text-center p-1 w-[130px] text-xs">${hours}hrs ${mins} min ago</p>
                           </div>` : ''}
                           
                        </div>
    
                        <!-- card description -->
                        <div class="flex-1">
                            <h2 class="text-lg font-bold">${x.title}</h2>
                            <div class="my-2">
                                <p class="inline-block">${x.authors[0].profile_name}</p>
                                <span>${x.authors[0].verified ? `<i class="fa-solid text-blue-500 fa-circle-check ml-2"></i>` : ''}</span>
                            </div>
                            <p>${x.others.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(cardDiv);
        })
    }

    else{
        const noContentDiv = document.createElement('div');
        noContentDiv.innerHTML = `
        <div class=" max-w-2xl  text-center flex flex-col justify-center items-center mx-auto">
                    <img class="mt-32 md:mt-48 w-[140px]" src="./images/icon.png" alt="">
                    <h1 class="text-3xl mt-8 font-bold">Oops!! Sorry, There is no <br> content here</h1>
                </div>
        `;
        noContentContainer.appendChild(noContentDiv);
    }


    console.log(data.data);

}
handleCategory();
handleLoadCategory('1000');