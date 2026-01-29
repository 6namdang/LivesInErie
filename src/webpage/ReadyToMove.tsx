export default function ReadyToMove() {
    const row = 4;

    return (
        <div className="grid place-items-center mt-45 px-4">
            <div className="w-full max-w-md bg-neutral-secondary-medium p-8 rounded-base border border-default-medium shadow-sm">
                <h2 className="text-2xl font-bold text-heading mb-6">Ready to move?</h2>
                
                <form className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-heading">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" 
                            placeholder="John Doe" 
                            required 
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-heading">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" 
                            placeholder="name@company.com" 
                            required 
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-heading">Your message</label>
                        <textarea 
                            id="message" 
                            rows={row} 
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" 
                            placeholder="Tell us about your project..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full text-white bg-brand hover:bg-brand-dark focus:ring-4 focus:outline-none focus:ring-brand-light font-medium rounded-base text-sm px-5 py-3.5 text-center transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}