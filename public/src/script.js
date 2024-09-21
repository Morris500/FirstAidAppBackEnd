
const CPR = 'images/diagnosis_images/image.png'
const Seizures = "images/diagnosis_images/image-1.png"
const Bleeding = "images/diagnosis_images/image-2.png"


const image_list = [CPR, Seizures, Bleeding, "images/diagnosis_images/image-3.png", "images/diagnosis_images/image-4.png", "images/diagnosis_images/image-5.png"]


const returnImagesAsList = () => {
    return image_list;
}


const disease_diagnosis = [  "Heart Attack", "Shock",  "Asthma"]
const list_item = document.getElementById("list")
const diagnosis_images_list = document.getElementById("diagnosis-images-list")


for (let i = 0; i < disease_diagnosis.length; i++) {
    const item_html = `<a href='/${disease_diagnosis[i]}'><div class='item'>${disease_diagnosis[i]}</div><a/>`
    list_item.innerHTML += item_html
}

const images_list = returnImagesAsList()
const text_list = ["CPR", "Bleeding", "seizures", "Asthma", "Snake Bite", "Heart Attack"]


for (var i = 0; i < images_list.length; i++) {
    console.log(images_list)
    const img_item = `<div class='img_container'><img src="${images_list[i]}"/><p>${text_list[i].toUpperCase()}</P><div>`
    diagnosis_images_list.innerHTML += img_item;
}