export const getEvents = async () => {
    const response = await fetch('/api/events');

    return response.json();
}