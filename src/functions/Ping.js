let intervalId;

self.onconnect = (e) => {
  const port = e.ports[0];
  
  if (!intervalId) {
    intervalId = setInterval(async () => {
      console.log('fetch');
      try {
        const response = await fetch("https://java-application-latest-be2q.onrender.com/api", { 
          signal: AbortSignal.timeout(3000) 
        });
        
        if (response.ok) {
          clearInterval(intervalId);
          port.postMessage({ status: 'success' });
        }
      } catch (error) {
        // Keep retrying
      }
    }, 3000);
  }
};