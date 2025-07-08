### Přidání leaderbord "Coins"

``` Lua
game.Players.PlayerAdded:Connect(function(player) -- Jakmile se připojí hráč do hry spustí se funkce, která má vstupní hodnotu player.
	local leaderstats = Instance.new("Folder") -- Proměnná leaderstats vytvoří nevou složku. 
	leaderstats.Parent = player -- Složka se přidá k objektu hráče, takže každý hráč má svou vlastní složku leaderstats. 
	leaderstats.Name = "leaderstats" -- Složka se pojmenuje leaderstats.
	
	local coins = Instance.new("IntValue") -- Vytvoří se nová proměnná typu IntValue (celé číslo), která se bude jmenovat Coins.
	coins.Parent = leaderstats -- Složka se přidá do složky leaderstats a stane se viditelnmou v tabulce hráčů.
	coins.Name = "Coins" -- Jméno hodnoty se nastaví na Coins.
end)
```

### Přepisování leaderboard hodnot

``` Lua
local player = game.Players.LocalPlayer -- Funguje pouze v LocalScriptu - odkazuje na aktuálního hráče, který LocalScript spouští.
local leaderstats = player:WaitForChild("leaderstats") -- Čeká až se v hráči objeví složka leaderstats.
local coins = leaderstats:WaitForChild("Coins") -- Čeká až se ve složce leaderstats objeví proměnná Coins.

local currencyLabel = script.Parent.CurrencyLabel -- Odkazuje na CurrencyLabel (Nápis ve hře) který je potomkem scriptu.

coins.Changed:Connect(function() -- Když se změní hodnota v proměnné coins spustí se funkce.
	currencyLabel.Text = coins.Value -- Pokaždé, když se coins.Value změní aktualizu je se text v GUI, na novou hodnotu.
end)
```

### Reakce na tlačítko

``` Lua
local gui = script.Parent -- Odkaz na rodiče scriptu.
local btn = gui.TextButton -- Vybrání TextButton z proměnné gui.

local phrases = { -- Table frází.
	"Ow! That hurt!",
	"Stop clicking on me",
	"Dont do that!",
	"This makes me mad!"
}

btn.MouseEnter:Connect(function() -- Najetí miše na btn.
	print("Player has entered in the btn.")
end)

btn.MouseLeave:Connect(function() -- Sjetí miše z btn.
	print("Player has left the btn.")
end)

btn.MouseButton1Click:Connect(function() -- Klinutí levím tlačítkem na myšce na btn.
	print("Btn has been left clicked.")
	
	local randomIndex = math.random(1, #phrases) -- Vytvoření random indexu mezi 1 a počtem prvků v phrases.
	local randomPhrase = phrases[randomIndex] -- Vybrání z phrases s indexem randomIndex.
	
	btn.Text = randomPhrase -- Změna textu v btn.
end)

btn.MouseButton2Click:Connect(function() -- kliknutí pravím tlačítkem na myšce.
	print("Btn has been right clicked.")
end)
```

### Při kliknutí na tlačítka ano nebo ne se změní TextLabel (barva, text)

``` Lua
local gui = script.Parent

local questionLabel = gui.QuestionLabel
local yesButton = gui.YesButton
local noButton = gui.NoButton

yesButton.MouseButton1Click:Connect(function()
	questionLabel.Text = "Si myslim more."
	questionLabel.BackgroundColor3 = Color3.fromRGB(0, 212, 0)
end)

noButton.MouseButton1Click:Connect(function()
	questionLabel.Text = "Go fuck yourself Niger."
	questionLabel.BackgroundColor3 = Color3.fromRGB(211, 0, 0)
end)
```

### TextBox

``` Lua
local textBox = script.Parent

textBox.Focused:Connect(function() -- Kliknutím na textBox se spustí funkce.
	print("focused")
	
	task.delay(5, function() -- Po 5 sekundách se spustí funkce.
		local isFocused = textBox:IsFocused() -- Vrátí true nebo false.
		
		if isFocused then
			textBox:ReleaseFocus(true) -- Donutí clienta aby se unfocus.
		end
	end)
end)

textBox.FocusLost:Connect(function(enterPressed) -- Po unfocus se spustí funkce. Ale pokud to udělal enterem tak se spustí if pod tím.
	if enterPressed then
		print("Zmáčknul enter.")
	end
end)

task.wait(5)
textBox:CaptureFocus() -- Přinutí clienta aby se focus na textBox.
```