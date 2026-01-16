export function checkHeading(str){
    // Check if string starts and ends with ** (bold markdown)
    return /^\*\*.*\*\*$/.test(str);
}

export function replaceHeadingStars(str){
    // Remove ** from start and end
    return str.replace(/^\*\*(.*)\*\*$/, '$1');
}

export function cleanStars(str){
    // Remove any remaining * characters
    return str.replace(/\*/g, '');
}