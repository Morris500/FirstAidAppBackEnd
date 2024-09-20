const CPR = 'images/diagnosis_images/image.png'
const Seizures = "images/diagnosis_images/image-1.png"
const Bleeding = "images/diagnosis_images/image-2.png"


const image_list = [CPR, Seizures, Bleeding, "images/diagnosis_images/image-3.png", "images/diagnosis_images/image-4.png", "images/diagnosis_images/image-5.png"]

const addImagesToList = (image) => {
    image_list.push(image)
}
const returnImagesAsList = () => {
    return image_list;
}

export {addImagesToList, returnImagesAsList}