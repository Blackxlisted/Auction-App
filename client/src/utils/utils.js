export const loadImage = async (imageName) => {
    try {
        if (imageName.endsWith('.jpg')) {
            imageName = imageName.slice(0, -4);
            const imageModule = await import(`../assets/${imageName}.jpg`);
            return imageModule.default;
        }
        
    } catch (error) {
        console.error('Error loading image', error);
    }
};
