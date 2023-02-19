export function ConvertProductToMessage(products : Map<string, number>) : string{
    const message : String[] = [];
    products.forEach((count, title) => {
        message.push(`${count} - ${title}`);
    });
    
    return `Вам выдано: ${message.join(', ')}`;
}