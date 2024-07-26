const specifiedWord = "Protick";

export async function welcome(word: string = "world"){
    console.log(`Hello ${word}`);
}
