document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const eventName = document.getElementById("eventName").value;

    if (!eventName.trim()) {
        alert("Event name cannot be empty!");
        return;
    }

    try {
        const response = await fetch("/setup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventName }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        alert(`Success: ${data.message}`);
    } catch (error) {
        console.error("Error submitting event:", error);
        alert("Failed to save the event. Please try again later.");
    }
});

async function fetchEvents() {
    try {
        const response = await fetch("/events", { method: "GET" });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const events = await response.json();
        const eventList = document.getElementById("eventList");

        eventList.innerHTML = "";

        events.forEach((event) => {
            const listItem = document.createElement("li");
            listItem.textContent = event.name;
            eventList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events. Please try again later.");
    }
}

document.addEventListener("DOMContentLoaded", fetchEvents);
