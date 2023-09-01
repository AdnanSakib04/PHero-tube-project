let currentCategoryID;
const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    console.log(data.data);

    const tabsContainer = document.getElementById('tabs-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category.category_id}')" class="btn text-[#252525B3] tab bg-[#25252526]">${category.category}</a>
        `;
        tabsContainer.appendChild(div);

    })

}


const handleLoadCategory = async (id) => {
    currentCategoryID = id;

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = "";

    const noContentContainer = document.getElementById('no-content-container');
    noContentContainer.innerHTML = "";

    // console.log('--------------length----------');
    // console.log(data.data.length);

    const checkLength = data.data.length;
    if (checkLength > 0) {
        data.data.forEach((x) => {
            // console.log(x.thumbnail);
            // console.log(x.title);
            // console.log(x.authors[0].profile_picture);
            // console.log(x.authors[0].profile_name);
            // console.log(x.authors[0].verified);
            // console.log(x.others.views);
            // console.log(x.others.posted_date);

            // calculating the hours and minute
            let totalSeconds = x.others.posted_date;
            const hours = parseInt(totalSeconds / 3600);
            totalSeconds = totalSeconds % 3600;
            const mins = parseInt(totalSeconds / 60);

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
            <!-- card 1 -->
            <div class="card card-compact w-[312px] h-[300px] bg-base-100  relative">
                <figure class="rounded-lg"><img class="w-[312px]  h-[200px]" src="${x?.thumbnail}" alt="" /></figure>
                <div class="p-1 my-2">
    
                    <div class="flex flex-row gap-3">
                        <!-- profile picture -->
                        <div class="relative ">
                            <img class="w-[40px] h-[40px] rounded-full" src="${x?.authors[0]?.profile_picture}" alt="">
                            ${x?.others?.posted_date ? `<div class="absolute  -mt-[88px] left-[156px]">
                            <p class="text-white bg-[#171717] text-center p-1 w-[140px] text-xs">${hours}hrs ${mins} min ago</p>
                           </div>` : ''}
                           
                        </div>
    
                        <!-- card description -->
                        <div class="flex-1">
                            <h2 class="text-lg font-bold">${x?.title}</h2>
                            <div class="my-2">
                                <p class="inline-block">${x?.authors[0]?.profile_name}</p>
                                <span>${x?.authors[0]?.verified ? `<i class="fa-solid text-blue-500 fa-circle-check ml-2"></i>` : ''}</span>
                            </div>
                            <p>${x?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(cardDiv);
        })
    }

    else {
        const noContentDiv = document.createElement('div');
        noContentDiv.innerHTML = `
        <div class=" max-w-2xl  text-center flex flex-col justify-center items-center mx-auto">
                    <img class="mt-32 md:mt-48 w-[140px]" src="./images/icon.png" alt="">
                    <h1 class="text-3xl mt-8 font-bold">Oops!! Sorry, There is no <br> content here</h1>
                </div>
        `;
        noContentContainer.appendChild(noContentDiv);
    }


    // console.log(data.data);

}


const handleSortByView = async () => {
    console.log(currentCategoryID);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${currentCategoryID}`);
    const data = await response.json();

    console.log(parseFloat(data.data[0].others.views.split('K')[0]));

    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = "";

    const noContentContainer = document.getElementById('no-content-container');
    noContentContainer.innerHTML = "";

    const checkLength = data.data.length;
    if (checkLength > 0) {

        // console.log('before sorting');
        // for (let i = 0; i < checkLength; i++) {
        //     console.log(parseFloat(data.data[i].others.views.split('K')[0]));
        // }

        for (let i = 0; i < checkLength; i++) {
            for (let j = i+1; j < checkLength; j++) {
                if (parseFloat(data.data[i].others.views.split('K')[0]) < parseFloat(data.data[j].others.views.split('K')[0])) {
                    const temp = data.data[i];
                    data.data[i] = data.data[j];
                    data.data[j] = temp;

                }
            }
        }

        // console.log('after sorting');
        // for (let i = 0; i < checkLength; i++) {
        //     console.log(parseFloat(data.data[i].others.views.split('K')[0]));
        // }

        data.data.forEach((x) => {
            // calculating the hours and minute
            let totalSeconds = x.others.posted_date;
            const hours = parseInt(totalSeconds / 3600);
            totalSeconds = totalSeconds % 3600;
            const mins = parseInt(totalSeconds / 60);

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
            <!-- card 1 -->
            <div class="card card-compact w-[312px] h-[300px] bg-base-100  relative">
                <figure class="rounded-lg"><img class="w-[312px]  h-[200px]" src="${x?.thumbnail}" alt="" /></figure>
                <div class="p-1 my-2">
    
                    <div class="flex flex-row gap-3">
                        <!-- profile picture -->
                        <div class="relative ">
                            <img class="w-[40px] h-[40px] rounded-full" src="${x?.authors[0]?.profile_picture}" alt="">
                            ${x?.others?.posted_date ? `<div class="absolute  -mt-[88px] left-[156px]">
                            <p class="text-white bg-[#171717] text-center p-1 w-[140px] text-xs">${hours}hrs ${mins} min ago</p>
                           </div>` : ''}
                           
                        </div>
    
                        <!-- card description -->
                        <div class="flex-1">
                            <h2 class="text-lg font-bold">${x?.title}</h2>
                            <div class="my-2">
                                <p class="inline-block">${x?.authors[0]?.profile_name}</p>
                                <span>${x?.authors[0]?.verified ? `<i class="fa-solid text-blue-500 fa-circle-check ml-2"></i>` : ''}</span>
                            </div>
                            <p>${x?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(cardDiv);
        })
    }

    else {
        const noContentDiv = document.createElement('div');
        noContentDiv.innerHTML = `
        <div class=" max-w-2xl  text-center flex flex-col justify-center items-center mx-auto">
                    <img class="mt-32 md:mt-48 w-[140px]" src="./images/icon.png" alt="">
                    <h1 class="text-3xl mt-8 font-bold">Oops!! Sorry, There is no <br> content here</h1>
                </div>
        `;
        noContentContainer.appendChild(noContentDiv);
    }

}
handleCategory();
handleLoadCategory('1000');
