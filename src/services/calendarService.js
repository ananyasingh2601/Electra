// src/services/calendarService.js

export class CalendarService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://www.googleapis.com/calendar/v3';
  }

  async addElectionEvent({ title, date, description, reminderDays = 7 }) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const event = {
      summary: `🗳️ ${title}`,
      description: `${description}\n\nAdded by ELECTRA — Your Election Intelligence Companion`,
      start: { date: startDate.toISOString().split('T')[0] },
      end: { date: endDate.toISOString().split('T')[0] },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: reminderDays * 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      },
      colorId: '11'
    };

    const response = await fetch(
      `${this.baseUrl}/calendars/primary/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    );

    if (!response.ok) throw new Error('Failed to add calendar event');
    return await response.json();
  }

  async addAllElectionDates(dates) {
    const results = await Promise.allSettled(
      dates.map(d => this.addElectionEvent(d))
    );
    return results;
  }
}
