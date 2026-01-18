export function detectTask(userInput){
    const input = userInput.toLowerCase();

    if(
        input.includes("explain code") || 
        input.includes("dry run") ||
        input.includes("algorithm") ||
        input.includes("time complexity") || 
        input.includes("binary search")
    ) {
        return "code";
    }

    if(
        input.includes("test case") ||
        input.includes("unit test") ||
        input.includes("edge case")
    ) {
        return "test";
    }

    if(
        input.includes("documentation") ||
        input.includes("readme") ||
        input.includes("docs")
    ){
        return "docs";
    }

    return "general";   

}