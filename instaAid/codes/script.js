import {returnImagesAsList, addImagesToList} from "./constants.js"

const disease_diagnosis = ["Cuts", "Snake Bites", "Epilepsy", "Heart Attack", "Shock", "Electrocution", "Asthma"]
const list_item = document.getElementById("list")
const diagnosis_images_list = document.getElementById("diagnosis-images-list")


for (let i = 0; i < disease_diagnosis.length; i++) {
    const item_html = `<a href='./${disease_diagnosis[i]}.html'><div class='item'>${disease_diagnosis[i]}</div><a/>`
    list_item.innerHTML += item_html
}

const images_list = returnImagesAsList()
const text_list = ["CPR", "Bleeding", "seizures", "Asthma", "Snake Bite", "Heart Attack"]


for (var i = 0; i < images_list.length; i++) {
    console.log(images_list)
    const img_item = `<div class='img_container'><img src="${images_list[i]}"/><p>${text_list[i].toUpperCase()}</P><div>`
    diagnosis_images_list.innerHTML += img_item;
}