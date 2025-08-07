export const LandingFooter = () => {
    return (
        <footer className="bg-ios-panel-contrast">
            <div className="container mx-auto px-6 py-8 text-center text-ios-text-secondary">
                <p>&copy; {new Date().getFullYear()} PolicyGPT. All rights reserved.</p>
                <p className="text-sm mt-2">This is a fictional product concept. Not a real service.</p>
            </div>
        </footer>
    );
};