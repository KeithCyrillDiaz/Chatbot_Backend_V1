

export const logger = {
    event: (message: String) => console.log("Event - ".magenta + message + "..."),
    error: (message: String, errorDetails?: any) => {
        console.log("Error - ".red + message);
        if(errorDetails){
            console.log("Details: ", JSON.stringify(errorDetails, null, 2));
        }
    },
    ready:(message: String) => console.log("Ready - ".green + message),
    success:(message: String) => console.log("Success - ".yellow + message),

}