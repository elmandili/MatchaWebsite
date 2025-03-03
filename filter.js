let category = "all";
let all_button = document.getElementById('all_button');
let matcha_button = document.getElementById('matcha_button');
let powder_button = document.getElementById('powder_button');
let accessories_button = document.getElementById('accessories_button');

let categories = document.getElementsByClassName("product_category");

function ClearActive(){
    all_button.classList.remove('active');
    matcha_button.classList.remove('active');
    powder_button.classList.remove('active');
    accessories_button.classList.remove('active');
}
console.log(categories);
function Filter(_category) {
    console.log("filter");
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === _category) {
            categories[i].classList.remove('hide');
        }
        else {
            categories[i].classList.add('hide');
        }

        switch (_category) {
            case 'all':
                ClearActive();
                all_button.classList.add('active');
                break;
            case 'matcha':
                ClearActive();
                matcha_button.classList.add('active');
                break;
            case 'powder':
                ClearActive();
                powder_button.classList.add('active');
                break;
            case 'accessories':
                ClearActive();
                accessories_button.classList.add('active');
                break;
        }
    }
}