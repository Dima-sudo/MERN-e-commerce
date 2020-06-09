

/**
 * @param {object} formObject - accepts a formObject with the form's field name and field value pairs.
 * @returns {[string]} - An array of filtered strings based on the form's input. Gets rid of punctuation
 * and conjuction words.
 * 
 * ----------------------------------------------------
 * Example: 
 * 
 * formObject = { title: "I'm a test field!" }
 * 
 * returns ["test", "field"];
 * ----------------------------------------------------
 * 
 * Reasoning:
 * Theoretically, such logic can be implemented on the server-side together with the rest of the search logic.
 * I opted for implementing it here for performance reasons so there is less stress on the server
 * in a real world scenario (The final array the server receives is about half of the alternative size for each request).
 * 
 */

export const getTags = (formObject) => {

    let tags = [];

    // After the form passes validation, tags are extracted from the form fields to be used in user searches.
    Object.entries(formObject).forEach(e => {
        // Price doesn't need to get added as a tag
        if(e[0] === 'price'){
          return;
        }

        /* 
          Item tags are generated based on the form input, the following loop attempts to get rid of conjunction words
          i.e (to, a, if, as) etc. and punctuation which can interfere with search results. This section can probably
          be done more elegantly with regex or some sort of a dictionary, will look into that later. 
        */

        const tagsToAppend = e[1].split(' ');

        let filteredTags = [];

        // Remove conjunction words
        tagsToAppend.forEach((tag) => {
          if(tag.length < 4){
            return;
          }

        // Cannot use iterable functions on strings (forEach, splice etc.) so converted into a char array to work normally
        const tagCharArray = Array.from(tag); 

        // Remove punctuation
          if(tag.includes('!') || tag.includes('.') || tag.includes(',') || tag.includes('=') || tag.includes('-') || tag.includes(';') || tag.includes('\'')){
            for(let i=0; i<tagCharArray.length; i++){
              if(tagCharArray[i] === '!' || tagCharArray[i] === '.' || tagCharArray[i] === ',' || tagCharArray[i] === '=' || tagCharArray[i] === '-' || tagCharArray[i] === ';' || tagCharArray[i] === '\''){
                tagCharArray.splice(i, 1);
                tag = tagCharArray.join(''); // Convert char array back to a string
                // Going back one step is neccessary since we're removing all instances of the value and not once.
                i--;
              }
            }
          }

          // After the raw input tags get filtered
          filteredTags.push(tag); 
        });
        //

               
        tags = [...tags, ...filteredTags];

        filteredTags = [];
      })

      return tags;
}
//
