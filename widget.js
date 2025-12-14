/*!
 * ConvertidorDivisas Widget
 * Embed this script on your website: <script src="https://convertidordivisas.es/widget.js"></script>
 * Then add: <div id="convertidor-widget"></div>
 */

(function() {
    const CSS = `
        #convertidor-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
            max-width: 400px;
            margin: 20px auto;
        }
        #convertidor-widget-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .widget-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            color: white;
        }
        .widget-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }
        .widget-form-group {
            margin-bottom: 15px;
        }
        .widget-label {
            display: block;
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 0.95rem;
        }
        .widget-input, .widget-select {
            width: 100%;
            padding: 10px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 6px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 0.95rem;
            font-weight: 500;
        }
        .widget-input::placeholder { color: rgba(255,255,255,0.7); }
        .widget-input:focus, .widget-select:focus {
            outline: none;
            border-color: rgba(255,255,255,0.8);
            background: rgba(255,255,255,0.15);
        }
        .widget-select option { color: #333; background: white; }
        .widget-button {
            width: 100%;
            padding: 12px;
            background: rgba(255,255,255,0.3);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 6px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        .widget-button:hover {
            background: rgba(255,255,255,0.4);
            border-color: rgba(255,255,255,0.8);
        }
        .widget-result {
            background: rgba(255,255,255,0.95);
            color: #2d3748;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            display: none;
        }
        .widget-result.show { display: block; }
        .widget-result-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #667eea;
        }
        .widget-footer {
            text-align: center;
            margin-top: 15px;
            font-size: 0.85rem;
            opacity: 0.9;
        }
        .widget-footer a {
            color: white;
            text-decoration: underline;
            font-weight: 600;
        }
    `;

    const HTML = `
        <div class="widget-card">
            <div class="widget-title">💱 Conversor de Divisas</div>
            <div class="widget-form-group">
                <label class="widget-label">Cantidad</label>
                <input type="number" id="widget-amount" class="widget-input" value="100" min="1" step="10">
            </div>
            <div class="widget-form-group">
                <label class="widget-label">De</label>
                <select id="widget-from" class="widget-select">
                    <option value="EUR">EUR €</option>
                    <option value="USD">USD $</option>
                    <option value="MXN">MXN $</option>
                    <option value="GBP">GBP £</option>
                </select>
            </div>
            <div class="widget-form-group">
                <label class="widget-label">A</label>
                <select id="widget-to" class="widget-select">
                    <option value="USD">USD $</option>
                    <option value="EUR">EUR €</option>
                    <option value="MXN">MXN $</option>
                    <option value="GBP">GBP £</option>
                </select>
            </div>
            <button class="widget-button" onclick="convertWidget()">Convertir</button>
            <div id="widget-result" class="widget-result">
                <div style="margin-bottom: 8px;">Recibirás aproximadamente</div>
                <div class="widget-result-value" id="widget-result-value">0</div>
            </div>
            <div class="widget-footer">
                Powered by <a href="https://convertidordivisas.es" target="_blank">ConvertidorDivisas.es</a>
            </div>
        </div>
    `;

    window.convertWidget = function() {
        const rates = {
            'EUR_USD': 1.10, 'EUR_MXN': 21.4, 'EUR_GBP': 0.84,
            'USD_EUR': 0.91, 'USD_MXN': 19.5, 'USD_GBP': 0.76,
            'MXN_EUR': 0.047, 'MXN_USD': 0.051, 'MXN_GBP': 0.039,
            'GBP_EUR': 1.19, 'GBP_USD': 1.31, 'GBP_MXN': 25.6
        };

        const amount = parseFloat(document.getElementById('widget-amount').value) || 0;
        const from = document.getElementById('widget-from').value;
        const to = document.getElementById('widget-to').value;

        if (from === to) {
            document.getElementById('widget-result-value').textContent = amount.toFixed(2);
        } else {
            const rate = rates[`${from}_${to}`] || 1;
            const result = amount * rate;
            document.getElementById('widget-result-value').textContent = result.toFixed(2) + ' ' + to;
        }

        document.getElementById('widget-result').classList.add('show');
    };

    // Initialize widget
    document.addEventListener('DOMContentLoaded', function() {
        const containers = document.querySelectorAll('#convertidor-widget');
        containers.forEach(function(container) {
            const style = document.createElement('style');
            style.textContent = CSS;
            document.head.appendChild(style);

            const wrapper = document.createElement('div');
            wrapper.id = 'convertidor-widget-container';
            wrapper.innerHTML = HTML;
            container.appendChild(wrapper);
        });
    });
})();
