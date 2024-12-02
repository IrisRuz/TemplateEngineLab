// Define a template using Mustache.js with styling for centering and colors
var template = `
    <ul style="list-style: none; text-align: center; padding: 0;">
        {{#data}}
        <li style="color: {{color}}; font-size: 1.5rem; margin: 10px 0;">
            Name: {{name}}
        </li>
        {{/data}}
    </ul>
`;

// Get the 'output' div element
var output = document.getElementById('output');

// Function to generate random colors
function generateColors(data) {
    const colors = data.map(() => {
        // Generate a random color in hex format
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });

    // Add color property to each data item
    return data.map((item, index) => ({
        ...item,
        color: colors[index],
    }));
}

// Fetch JSON data from the file
fetch('data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Add colors to data
        const dataWithColors = generateColors(data);

        // Render the data using the template
        var rendered = Mustache.render(template, { data: dataWithColors });
        output.innerHTML = rendered;
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
