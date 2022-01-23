$(document).ready(function () {
    $("form").keyup(function () {
        $('#output').html("");
        let mdText = $('#inputSentence').val()
        let inputList = md.processInput(mdText)
        let processedList = md.convertMdToHTML(inputList)
        md.display(processedList)
    });
});

class MarkDown {

    /**{
     * Regular expressions defined as constants
     * 
     * @param {Void}
     * @returns {Void}
     */
    
    constructor() {
        this.regexp = Object.freeze({
            "h1": /^#.*/g,
            "h2": /^##.*/g,
            "h3": /^###.*/g,
            "blockquote": /^> */g,
            "code": /^\`.*/g,
            "link": /\[.*\]\(.*\)/g,
            "i": /\*\^*(.*?)\^*\*/g,
            "strong": /\*\*(.*?)\*\*/g,
        });
    }

        /**{
     * Preprocesses the input text for defined entities
     * 
     * @param {InputText}
     * @returns {preProcessedList}
     */

    processInput(input) {
        let inputList = input.replace(/\n/g, "<br> ").split(/([,.\s])/)
        for (let [index, value] of inputList.entries()) {

            // Matches start syntax for Markdown
            if (value.match(/^(\*\^*).*/g) ||
                value.startsWith("**") ||
                value.startsWith(">") ||
                value.startsWith("`") ||
                value.startsWith("[") ||
                value.startsWith("#")) 
            {
                /**
                 * Matches end syntax for Markdown and concatinates 2 or more words based
                 * on same entity
                 */
                for (let i = index + 1; i < inputList.length; i++) {
                    if (!(inputList[index].endsWith("*") ||
                        inputList[index].endsWith(")") ||
                        inputList[index].endsWith("`") ||
                        inputList[index].endsWith("<br>"))
                    ) 
                    {
                        inputList[index] += inputList[i];
                        inputList[i] = ""
                    }
                }
            }
        }

        // Removes empty string in list
        inputList = $.grep(inputList, function (n) {
            return (n);
        });
        return inputList
    }

        /**{
     * Converts markdown to HTML
     * 
     * @param {preProcessedList}
     * @returns {ConvertedList}
     */

    convertMdToHTML(preProcessedList) {
        for (let [index, text] of preProcessedList.entries()) {
            for (const [key, value] of Object.entries(this.regexp)) {
                text = text.replace("<br>", "\n").trim()
                //Matches all regex defined in constructor with the Preprocessed List
                if (value.test(text)) {
                    //Creates anchor tag for link regex
                    if (key === "link") {
                        let link = text.substring(text.indexOf('(') + 1, text.indexOf(')'))
                        let linkText = text.substring(text.indexOf('[') + 1, text.indexOf(']'))
                        preProcessedList[index] = `<a href="${link}">${linkText}</a>`
                    }
                    else {
                        //Creates HTML tags for definied markdown entities
                        let word = text.replace(/(^>)|[#*`]+/g, "")
                        preProcessedList[index] = `<${key}>${word}</${key}>`
                    }
                }
            }
        }
        return preProcessedList
    }

    /**{
     * Displays processed list
     * 
     * @param {ProcessedList}
     * @returns {Void}
     */

    display(processedList) {
        let displayText = processedList.join(" ")
        let html = $.parseHTML(displayText)
        $('#output').append(html);
    }
}

md = new MarkDown();