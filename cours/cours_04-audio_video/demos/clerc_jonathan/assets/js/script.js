
// Shows basic usage and methods of VideoPlayer
VideoPlayer.usage();

// Create a new player on first element that have the .player class
// The function focus, ambient ans hash are used because we may not want them
var videoPlayer = new VideoPlayer('.player')
                      .focus()          // Focus element to use keyboard action
                      .enableAmbient()  // Enable ambient colors
                      .useHash();       // Use hash location to custom start time
