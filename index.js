//doing this with vanilla JS 

/**
 * Represents the valid choices that we can make for a round 
 */
class Round{
    constructor(country,options){
        this.country =  country;
        this.options = options
    }
}

/**
 * Stores each game round as a list of 25 rounds 
 */
class Game{

    getRandomInt(){
        return Math.floor(Math.random() * this.mapKeys.length);
    }
    
    convertFileCountryName(fileName){
        const splitPart = fileName.split("_");
        const namePart = splitPart[splitPart.length-1];

        return namePart.slice(0,namePart.length-4);
    }

    //creates game info 
    constructor(map,mapKeys){

        this.map = map; 
        this.mapKeys=mapKeys;

        this.seen_choices = new Set() 
        this.roundList = []

        /**
         * Fill with 25 valid rounds 
         */
        while(this.seen_choices.size < 25){
            const newChoice = this.mapKeys[this.getRandomInt()];
            if(!this.seen_choices.has(newChoice)){
                this.seen_choices.add(newChoice);

                const options = new Set()
                
                //need to determine when to insert the correct item 
                const pos = Math.ceil(Math.random()*3)

                //fill options with 3 more random choices until it's full
                var it = 0;  
                while(options.size < 4){
                    const fillerChoice = this.mapKeys[this.getRandomInt()];

                    //add valid country name randomly 
                    if(it==pos){
                        options.add(newChoice);
                    }

                    if(!options.has(fillerChoice) && options.size<4){
                        options.add(fillerChoice);
                    }   
                    it++; 
                }  
                
                //add new object to list of rounds 
                this.roundList.push(new Round(newChoice,options));

            }
        }
    }
}

function loadGame(rounds,idx,nameToMap,optionButtons,ROOT){
    const round = rounds[idx]; 
    const imgName = nameToMap[round.country];
    var flagImage = document.getElementById("flag_img")
    //change picture of round 
    flagImage.src = `${ROOT}${imgName}`;

    var optionIndex = 0; 
    for (const country of round.options){
        var button = optionButtons[optionIndex];
        button.textContent=country;
        optionIndex++;
    }
}

function main(){

    const rawInfo = [['Afghanistan', 'Flag_of_Afghanistan.svg'], ['Albania', 'Flag_of_Albania.svg'], ['Algeria', 'Flag_of_Algeria.svg'], ['Andorra', 'Flag_of_Andorra.svg'], ['Angola', 'Flag_of_Angola.svg'], ['Antigua and Barbuda', 'Flag_of_Antigua and Barbuda.svg'], ['Argentina', 'Flag_of_Argentina.svg'], ['Armenia', 'Flag_of_Armenia.svg'], ['Australia', 'Flag_of_Australia.svg'], ['Austria', 'Flag_of_Austria.svg'], ['Azerbaijan', 'Flag_of_Azerbaijan.svg'], ['Bahamas', 'Flag_of_Bahamas.svg'], ['Bahrain', 'Flag_of_Bahrain.svg'], ['Bangladesh', 'Flag_of_Bangladesh.svg'], ['Barbados', 'Flag_of_Barbados.svg'], ['Belarus', 'Flag_of_Belarus.svg'], ['Belgium', 'Flag_of_Belgium.svg'], ['Belize', 'Flag_of_Belize.svg'], ['Benin', 'Flag_of_Benin.svg'], ['Bhutan', 'Flag_of_Bhutan.svg'], ['Bolivia', 'Flag_of_Bolivia.svg'], ['Bosnia and Herzegovina', 'Flag_of_Bosnia and Herzegovina.svg'], ['Botswana', 'Flag_of_Botswana.svg'], ['Brazil', 'Flag_of_Brazil.svg'], ['Brunei', 'Flag_of_Brunei.svg'], ['Bulgaria', 'Flag_of_Bulgaria.svg'], ['Burkina Faso', 'Flag_of_Burkina Faso.svg'], ['Burundi', 'Flag_of_Burundi.svg'], ['Cambodia', 'Flag_of_Cambodia.svg'], ['Cameroon', 'Flag_of_Cameroon.svg'], ['Canada', 'Flag_of_Canada.svg'], ['Cape Verde', 'Flag_of_Cape Verde.svg'], ['Central African Republic', 'Flag_of_Central African Republic.svg'], ['Chad', 'Flag_of_Chad.svg'], ['Chile', 'Flag_of_Chile.svg'], ['China', 'Flag_of_China.svg'], ['Colombia', 'Flag_of_Colombia.svg'], ['Comoros', 'Flag_of_Comoros.svg'], ['Costa Rica', 'Flag_of_Costa Rica.svg'], ['Croatia', 'Flag_of_Croatia.svg'], ['Cuba', 'Flag_of_Cuba.svg'], ['Cyprus', 'Flag_of_Cyprus.svg'], ['Czech Republic', 'Flag_of_Czech Republic.svg'], ['Democratic Republic of the Congo', 'Flag_of_Democratic Republic of the Congo.svg'], ['Denmark', 'Flag_of_Denmark.svg'], ['Djibouti', 'Flag_of_Djibouti.svg'], ['Dominica', 'Flag_of_Dominica.svg'], ['Dominican Republic', 'Flag_of_Dominican Republic.svg'], ['East Timor', 'Flag_of_East Timor.svg'], ['Ecuador', 'Flag_of_Ecuador.svg'], ['Egypt', 'Flag_of_Egypt.svg'], ['El Salvador', 'Flag_of_El Salvador.svg'], ['Equatorial Guinea', 'Flag_of_Equatorial Guinea.svg'], ['Eritrea', 'Flag_of_Eritrea.svg'], ['Estonia', 'Flag_of_Estonia.svg'], ['Eswatini', 'Flag_of_Eswatini.svg'], ['Ethiopia', 'Flag_of_Ethiopia.svg'], ['Fiji', 'Flag_of_Fiji.svg'], ['Finland', 'Flag_of_Finland.svg'], ['France', 'Flag_of_France.svg'], ['Gabon', 'Flag_of_Gabon.svg'], ['Gambia', 'Flag_of_Gambia.svg'], ['Georgia', 'Flag_of_Georgia.svg'], ['Germany', 'Flag_of_Germany.svg'], ['Ghana', 'Flag_of_Ghana.svg'], ['Greece', 'Flag_of_Greece.svg'], ['Grenada', 'Flag_of_Grenada.svg'], ['Guatemala', 'Flag_of_Guatemala.svg'], ['Guinea-Bissau', 'Flag_of_Guinea-Bissau.svg'], ['Guinea', 'Flag_of_Guinea.svg'], ['Guyana', 'Flag_of_Guyana.svg'], ['Haiti', 'Flag_of_Haiti.svg'], ['Honduras', 'Flag_of_Honduras.svg'], ['Hungary', 'Flag_of_Hungary.svg'], ['Iceland', 'Flag_of_Iceland.svg'], ['India', 'Flag_of_India.svg'], ['Indonesia', 'Flag_of_Indonesia.svg'], ['Iran', 'Flag_of_Iran.svg'], ['Iraq', 'Flag_of_Iraq.svg'], ['Ireland', 'Flag_of_Ireland.svg'], ['Israel', 'Flag_of_Israel.svg'], ['Italy', 'Flag_of_Italy.svg'], ['Ivory Coast', 'Flag_of_Ivory Coast.svg'], ['Jamaica', 'Flag_of_Jamaica.svg'], ['Japan', 'Flag_of_Japan.svg'], ['Jordan', 'Flag_of_Jordan.svg'], ['Kazakhstan', 'Flag_of_Kazakhstan.svg'], ['Kenya', 'Flag_of_Kenya.svg'], ['Kiribati', 'Flag_of_Kiribati.svg'], ['Kuwait', 'Flag_of_Kuwait.svg'], ['Kyrgyzstan', 'Flag_of_Kyrgyzstan.svg'], ['Laos', 'Flag_of_Laos.svg'], ['Latvia', 'Flag_of_Latvia.svg'], ['Lebanon', 'Flag_of_Lebanon.svg'], ['Lesotho', 'Flag_of_Lesotho.svg'], ['Liberia', 'Flag_of_Liberia.svg'], ['Libya', 'Flag_of_Libya.svg'], ['Liechtenstein', 'Flag_of_Liechtenstein.svg'], ['Lithuania', 'Flag_of_Lithuania.svg'], ['Luxembourg', 'Flag_of_Luxembourg.svg'], ['Madagascar', 'Flag_of_Madagascar.svg'], ['Malawi', 'Flag_of_Malawi.svg'], ['Malaysia', 'Flag_of_Malaysia.svg'], ['Maldives', 'Flag_of_Maldives.svg'], ['Mali', 'Flag_of_Mali.svg'], ['Malta', 'Flag_of_Malta.svg'], ['Marshall Islands', 'Flag_of_Marshall Islands.svg'], ['Mauritania', 'Flag_of_Mauritania.svg'], ['Mauritius', 'Flag_of_Mauritius.svg'], ['Mexico', 'Flag_of_Mexico.svg'], ['Micronesia', 'Flag_of_Micronesia.svg'], ['Moldova', 'Flag_of_Moldova.svg'], ['Monaco', 'Flag_of_Monaco.svg'], ['Mongolia', 'Flag_of_Mongolia.svg'], ['Montenegro', 'Flag_of_Montenegro.svg'], ['Morocco', 'Flag_of_Morocco.svg'], ['Mozambique', 'Flag_of_Mozambique.svg'], ['Myanmar', 'Flag_of_Myanmar.svg'], ['Namibia', 'Flag_of_Namibia.svg'], ['Nauru', 'Flag_of_Nauru.svg'], ['Nepal', 'Flag_of_Nepal.svg'], ['Netherlands', 'Flag_of_Netherlands.svg'], ['New Zealand', 'Flag_of_New Zealand.svg'], ['Nicaragua', 'Flag_of_Nicaragua.svg'], ['Niger', 'Flag_of_Niger.svg'], ['Nigeria', 'Flag_of_Nigeria.svg'], ['North Korea', 'Flag_of_North Korea.svg'], ['North Macedonia', 'Flag_of_North Macedonia.svg'], ['Norway', 'Flag_of_Norway.svg'], ['Oman', 'Flag_of_Oman.svg'], ['Pakistan', 'Flag_of_Pakistan.svg'], ['Palau', 'Flag_of_Palau.svg'], ['Palestine', 'Flag_of_Palestine.svg'], ['Panama', 'Flag_of_Panama.svg'], ['Papua New Guinea', 'Flag_of_Papua New Guinea.svg'], ['Paraguay', 'Flag_of_Paraguay.svg'], ['Peru', 'Flag_of_Peru.svg'], ['Philippines', 'Flag_of_Philippines.svg'], ['Poland', 'Flag_of_Poland.svg'], ['Portugal', 'Flag_of_Portugal.svg'], ['Qatar', 'Flag_of_Qatar.svg'], ['Republic of the Congo', 'Flag_of_Republic of the Congo.svg'], ['Romania', 'Flag_of_Romania.svg'], ['Russia', 'Flag_of_Russia.svg'], ['Rwanda', 'Flag_of_Rwanda.svg'], ['Saint Kitts and Nevis', 'Flag_of_Saint Kitts and Nevis.svg'], ['Saint Lucia', 'Flag_of_Saint Lucia.svg'], ['Saint Vincent and the Grenadines', 'Flag_of_Saint Vincent and the Grenadines.svg'], ['Samoa', 'Flag_of_Samoa.svg'], 
        ['San Marino', 'Flag_of_San Marino.svg'], ['Sao Tome e Principe', 'Flag_of_Sao Tome e Principe.svg'], ['Saudi Arabia', 'Flag_of_Saudi Arabia.svg'], ['Senegal', 'Flag_of_Senegal.svg'], ['Serbia', 'Flag_of_Serbia.svg'], ['Seychelles', 'Flag_of_Seychelles.svg'], ['Sierra Leone', 'Flag_of_Sierra Leone.svg'], ['Singapore', 'Flag_of_Singapore.svg'], ['Slovakia', 'Flag_of_Slovakia.svg'], ['Slovenia', 'Flag_of_Slovenia.svg'], ['Solomon Islands', 'Flag_of_Solomon Islands.svg'], ['Somalia', 'Flag_of_Somalia.svg'], ['South Africa', 'Flag_of_South Africa.svg'], ['South Korea', 'Flag_of_South Korea.svg'], ['South Sudan', 'Flag_of_South Sudan.svg'], ['Spain', 'Flag_of_Spain.svg'], ['Sri Lanka', 'Flag_of_Sri Lanka.svg'], ['Sudan', 'Flag_of_Sudan.svg'], ['Suriname', 'Flag_of_Suriname.svg'], ['Sweden', 'Flag_of_Sweden.svg'], ['Switzerland', 'Flag_of_Switzerland.svg'], ['Syria', 'Flag_of_Syria.svg'], ['Tajikistan', 'Flag_of_Tajikistan.svg'], ['Tanzania', 'Flag_of_Tanzania.svg'], ['Thailand', 'Flag_of_Thailand.svg'], ['Taliban', 'Flag_of_the_Taliban.svg'], ['Togo', 'Flag_of_Togo.svg'], ['Tonga', 'Flag_of_Tonga.svg'], 
        ['Trinidad and Tobago', 'Flag_of_Trinidad and Tobago.svg'], ['Tunisia', 'Flag_of_Tunisia.svg'], ['Turkey', 'Flag_of_Turkey.svg'], ['Turkmenistan', 'Flag_of_Turkmenistan.svg'], ['Tuvalu', 'Flag_of_Tuvalu.svg'], ['Uganda', 'Flag_of_Uganda.svg'], ['Ukraine', 'Flag_of_Ukraine.svg'], ['United Arab Emirates', 'Flag_of_United Arab Emirates.svg'], ['United Kingdom', 'Flag_of_United Kingdom.svg'], ['United States', 'Flag_of_United States.svg'], ['Uruguay', 'Flag_of_Uruguay.svg'], ['Uzbekistan', 'Flag_of_Uzbekistan.svg'], ['Vanuatu', 'Flag_of_Vanuatu.svg'], ['Vatican City', 'Flag_of_Vatican City.svg'], ['Venezuela', 'Flag_of_Venezuela.svg'], ['Vietnam', 'Flag_of_Vietnam.svg'], ['Yemen', 'Flag_of_Yemen.svg'], ['Zambia', 'Flag_of_Zambia.svg'], ['Zimbabwe', 'Flag_of_Zimbabwe.svg'] ]; 

    //feed info into the name to map map 
    const nameToMap = new Map()
    const mapKeys = []
    var score = 0; 
    var scoreTracker = document.getElementById("score");

    //convert into map and map keys 
    for(let i = 0; i < rawInfo.length;i++){
        //part[0] is the country name, part[1] is the DIR of the img it corresponds to 
        const part = rawInfo[i];
        mapKeys.push(part[0]);
        nameToMap[part[0]]=part[1];
    }

    //add options to an option list 
    const optionButtons = [document.getElementById("option1"),document.getElementById("option2"),document.getElementById("option3"),document.getElementById("option4")];
    const continueButton = document.getElementById("nextRound");

    //get image doc name 

    const ROOT = "images/"

    //create game object to get rounds 
    var myGame = new Game(nameToMap,mapKeys);

    const rounds = myGame.roundList;
    //which round we are on 
    var roundIdx = 0; 
    var notClicked = true; 

    for(const button of optionButtons){
        button.addEventListener("click",()=>{

            //only update if we haven't clicked before 
            if(notClicked){
                notClicked=false; 
                const clicked = button.textContent;
                //success

                if(clicked == rounds[roundIdx].country){

                    //highlight clicked button as green 
                    let audio = new Audio("audio/success sound.mp3")
                    audio.play();
                    button.classList.replace("game_button","correct_button")
                    score++;
                    scoreTracker.textContent=`Score:${score}`;
                }
                else
                {
                    let audio = new Audio("audio/fail sound.mp3")
                    audio.play();
                    //highlight clicked button as red 
                    button.classList.replace("game_button","wrong_button")
                }

                let countryNameAudio = new Audio(`audio/${rounds[roundIdx].country}.mp3`)
                countryNameAudio.play();

                //make invis button not invis 
                roundIdx+=1; 
                continueButton.classList.replace("invis_button","game_button")
                continueButton.textContent="Continue";
            }

            //failure 
        })
    }

    continueButton.addEventListener("click",()=>{
        //only modify if we have clicked 
        if(!notClicked){

            /**
             * END OF ROUND 
             */
            //25 flags per round 
            if(roundIdx==25){



                const outsideElement = document.getElementById("main_panel");
                outsideElement.innerHTML=''
                
                const endScore = document.createElement('h1');
                endScore.textContent=`Score:${score}`;

                const homeButton = document.createElement('button');
                homeButton.classList.value='game_button';
                homeButton.textContent="Home";
                homeButton.addEventListener("click",()=>{

                })
                const restartButton = document.createElement('button');
                restartButton.textContent="Restart";
                restartButton.classList.value='game_button';
                restartButton.addEventListener("click",()=>{

                    window.location.reload();

                })

                outsideElement.append(endScore);
                outsideElement.appendChild(homeButton);
                outsideElement.appendChild(restartButton);

            }
            else{
                loadGame(rounds,roundIdx,nameToMap,optionButtons,ROOT);
                for(const button of optionButtons){
                    button.classList.value="game_button";
                }
            }
        }
        //reset continue button
        notClicked=true;
        continueButton.classList.replace("game_button","invis_button");
        continueButton.textContent="";
    })

    loadGame(rounds,roundIdx,nameToMap,optionButtons,ROOT);

}

main()