// Tab Manager Pro - Browser Extension
document.addEventListener('DOMContentLoaded', function() {
    // Update tab count
    chrome.tabs.query({}, function(tabs) {
        document.getElementById('tabCount').textContent = tabs.length;
    });
    
    // Group tabs by domain
    document.getElementById('groupByDomain').addEventListener('click', function() {
        chrome.tabs.query({}, function(tabs) {
            const domains = {};
            
            tabs.forEach(tab => {
                try {
                    const url = new URL(tab.url);
                    const domain = url.hostname;
                    
                    if (!domains[domain]) {
                        domains[domain] = [];
                    }
                    domains[domain].push(tab.id);
                } catch (e) {
                    // Invalid URL, skip
                }
            });
            
            // Create groups for domains with multiple tabs
            Object.entries(domains).forEach(([domain, tabIds]) => {
                if (tabIds.length > 1) {
                    chrome.tabs.group({ tabIds: tabIds }, function(groupId) {
                        chrome.tabGroups.update(groupId, { title: domain, color: 'blue' });
                    });
                }
            });
            
            alert(`Tabs grouped by domain!`);
        });
    });
    
    // Close duplicate tabs
    document.getElementById('closeDuplicates').addEventListener('click', function() {
        chrome.tabs.query({}, function(tabs) {
            const seenUrls = new Set();
            const duplicates = [];
            
            tabs.forEach(tab => {
                if (seenUrls.has(tab.url)) {
                    duplicates.push(tab.id);
                } else {
                    seenUrls.add(tab.url);
                }
            });
            
            if (duplicates.length > 0) {
                chrome.tabs.remove(duplicates);
                alert(`Closed ${duplicates.length} duplicate tabs`);
            } else {
                alert('No duplicate tabs found');
            }
        });
    });
    
    // Save session
    document.getElementById('saveSession').addEventListener('click', function() {
        chrome.tabs.query({}, function(tabs) {
            const session = {
                timestamp: new Date().toISOString(),
                tabs: tabs.map(tab => ({
                    url: tab.url,
                    title: tab.title,
                    pinned: tab.pinned
                }))
            };
            
            chrome.storage.local.set({ 'lastSession': session }, function() {
                alert(`Session saved with ${tabs.length} tabs`);
            });
        });
    });
    
    // Load session
    document.getElementById('loadSession').addEventListener('click', function() {
        chrome.storage.local.get(['lastSession'], function(result) {
            if (result.lastSession) {
                const session = result.lastSession;
                session.tabs.forEach(tab => {
                    chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
                });
                alert(`Loading session from ${new Date(session.timestamp).toLocaleString()}`);
            } else {
                alert('No saved session found');
            }
        });
    });
    
    // Upgrade button
    document.getElementById('upgradeButton').addEventListener('click', function() {
        document.getElementById('paymentInstructions').style.display = 'block';
    });
    
    // Remove watermark link
    document.getElementById('removeWatermark').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('paymentInstructions').style.display = 'block';
    });
    
    // Check if premium
    chrome.storage.local.get(['isPremium'], function(result) {
        if (result.isPremium) {
            document.getElementById('watermark').style.display = 'none';
            document.querySelector('.premium-section').innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #10b981;">✨ Premium Activated</h3>
                <p style="margin: 5px 0; font-size: 0.9em;">Thank you for your support!</p>
            `;
        }
    });
    
    // Create payment instructions element
    const paymentDiv = document.createElement('div');
    paymentDiv.id = 'paymentInstructions';
    paymentDiv.style.display = 'none';
    paymentDiv.style.background = 'white';
    paymentDiv.style.padding = '15px';
    paymentDiv.style.borderRadius = '8px';
    paymentDiv.style.marginTop = '15px';
    paymentDiv.style.border = '2px solid #4f46e5';
    paymentDiv.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #4f46e5;">💰 Upgrade to Premium</h3>
        <p style="margin: 5px 0; font-size: 0.9em;"><strong>Price:</strong> $5 one-time</p>
        <p style="margin: 5px 0; font-size: 0.9em;"><strong>Send payment to:</strong></p>
        <ul style="font-size: 0.8em; margin: 10px 0;">
            <li><strong>PayPal:</strong> paypal.me/ismailnyza</li>
            <li><strong>Ethereum:</strong> 0xC9b90EF3273C5c271848Bb02461883C4078EAa5d</li>
            <li><strong>Bitcoin:</strong> bc1qwg8e6j35g6j8d9f4h3k7l9p2q1w3e4r5t6y7</li>
        </ul>
        <p style="margin: 5px 0; font-size: 0.9em;"><strong>Then email receipt to:</strong> tabmanager@protonmail.com</p>
        <p style="margin: 5px 0; font-size: 0.9em;"><strong>You'll receive:</strong> Activation code + premium version</p>
        <p style="color: #16a34a; margin-top: 10px; font-size: 0.8em;">✅ 30-day money-back guarantee</p>
    `;
    document.body.appendChild(paymentDiv);
});