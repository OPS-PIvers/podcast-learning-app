const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const API_KEY = 'YOUR_API_KEY';

class SheetsAPI {
    static async init() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        });
    }

    static async loadPodcastData() {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Podcasts!A2:D', // Adjust range based on your sheet
        });

        return response.result.values.map(row => ({
            title: row[0],
            audioUrl: row[1],
            description: row[2],
            duration: row[3]
        }));
    }

    static async loadQuestions(podcastTitle) {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Questions!A2:F', // Adjust range based on your sheet
        });

        return response.result.values
            .filter(row => row[0] === podcastTitle)
            .map(row => ({
                timestamp: parseFloat(row[1]),
                type: row[2],
                question: row[3],
                options: row[4] ? row[4].split('|') : [],
                correctAnswer: row[5]
            }));
    }
}
