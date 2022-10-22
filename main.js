const prompt = require('prompt-sync')({sigint:true});
let time = 6;
let action = '';

// This object holds all of your fish
let daysCatch =  {
    totalFishCaught:0,
    totalWeight: 0,
    totalValue: 0,
    caughtFish:[]
    };

 //Initial prompt  
console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish");
console.log("for six hours (till 12:00pm) and can catch at most 10 lbs of fish.");
console.log("\n==========================================\n");

//Fishing loop
while(time <= 12){
    
    if(time < 12 && daysCatch.totalWeight < 10){
        console.log(`The time is ${time}:00am. So far you've caught:`);
        console.log(`${daysCatch.totalFishCaught} fish, ${daysCatch.totalWeight} lbs, $${daysCatch.totalValue}\n`)
        let tempCatch = generateFish(daysCatch);
        let tempTotalWeight = Number(daysCatch.totalWeight)+ Number(tempCatch.weight);
        if(tempTotalWeight >= 10){
            console.log(`This fish would put you over 10 lbs, so you release it.\n`);
            console.log(`Press [enter] to continue.`);
            action = prompt("> ")
            console.log("\n==========================================\n"); 
        }
        else{
            console.log(`You caught a "${tempCatch.name}" weighing ${tempCatch.weight} lbs`)
            console.log(`and valued at $${tempCatch.value}\n`);
            console.log("Your action: [c]atch or [r]elease?"); 
            action = prompt("> ")
            if(action === 'c'){
                addToDaysCatch(tempCatch);
                console.log("You chose to keep the fish.");
            }
            console.log("\n==========================================\n");
        }
    }
    else if(time == 12 ){
        console.log("The time is 12:00pm. Times up!\n")
        console.log(`You caught ${daysCatch.totalFishCaught} fish:`)
        let fishArray = daysCatch.caughtFish;
        for(let i = 0; i < fishArray.length; i++){
            console.log(`* ${fishArray[i].name}, ${fishArray[i].weight} lbs, $${fishArray[i].value}`)
        }
        console.log(`\nTotal weight: ${daysCatch.totalWeight} lbs`)
        console.log(`Total value: $${daysCatch.totalValue}`)
    }

time++;
}




// adds catch to daysCatch
function addToDaysCatch(fish){
    daysCatch.caughtFish.push(fish);
    let tW = Number(daysCatch.totalWeight) + Number(fish.weight);
    daysCatch.totalWeight = tW.toFixed(2);
    let tV = Number(daysCatch.totalValue) + Number(fish.value); 
    daysCatch.totalValue = tV.toFixed(2); 
    daysCatch.totalFishCaught = daysCatch.totalFishCaught + 1;
    return daysCatch;
}

// generates a fish
function generateFish(){
    let value = 0;
    let weight =  Number((Math.random() * 6)+ .25).toFixed(2)
    
    if(weight < 1){
        value = (weight * 8).toFixed(2)
    }
    else if(weight >= 1){
        value = (weight * 13).toFixed(2)
    }
    
    let name = createFishName(weight);
    let fish = {
    name:name,
    weight:weight,
    value:value
    }

    return fish
}

// Creates fish's name
function createFishName(weight) {
    let size, desc, type = '';
    let randSizeName = Math.floor((Math.random() * 3)+ 1)
    let randDesc = Math.floor((Math.random() * 3)+ 1)
    let randType =  Math.floor((Math.random() * 8)+ 1)
    const big = ["Jumbo", "Huge", "Enormous"]
    const small = ["Lean", "Tiny","Mini"]
    const descriptor = ["Slimy", "Scaly", "Fresh"]
    const fishTypes = ["Salmon", "Tuna", "Tilapia", "Cod", "Red Snapper", "Flounder", "Cat Fish", "Trout"]

    // Chooses size (big or small) and an adjective relative to fish's size
    if(weight >= 1){
        if(randSizeName === 1){
            size = big[0];
        }
        else if(randSizeName === 2){
            size = big[1];
        }
        else if(randSizeName === 3){
            size = big[2];
        }
    }
    else if(weight < 1){
        if(randSizeName === 1){
            size = small[0];
        }
        else if(randSizeName === 2){
            size = small[1];
        }
        else if(randSizeName === 3){
            size = small[2];
        }
    }

    //Chooses a descriptor (Slimy, Scaly, or Fresh)
    if(randDesc === 1){
        desc = descriptor[0];
    }
    else if(randDesc === 2){
        desc = descriptor[1];
    }
    else if(randDesc === 3){
        desc = descriptor[2];
    }

    //Chooses fish type
    if(randType === 1){
        type = fishTypes[0];
    }
    if(randType === 2){
        type = fishTypes[1];
    }
    if(randType === 3){
        type = fishTypes[2];
    }
    if(randType === 4){
        type = fishTypes[3];
    }
    if(randType === 5){
        type = fishTypes[4];
    }
    if(randType === 6){
        type = fishTypes[5];
    }
    if(randType === 7){
        type = fishTypes[6];
    }
    if(randType === 8){
        type = fishTypes[7];
    }

    let fishName = `${size} ${desc} ${type}`;
    return fishName;

}