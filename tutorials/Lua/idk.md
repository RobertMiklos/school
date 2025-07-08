# Lua

### Umřeš když se dotkneš jednoho z parts

``` Lua
local killParts = game.Workspace.KillParts:GetChildren() -- Vrátí všechny děti složky KillParts v table.

for _, part in pairs(killParts) do -- _ znamená že ten parametr nechce. Pairs je kvůli tomu že je to v table.
	part.Touched:Connect(function(touchPart)
		local humanoid = touchPart.Parent:FindFirstChild("Humanoid") -- Když se dotkne tak přejde do .Parent .Touched 
																	 --kde hledá "Humanoid" ve kterém je napšáno všechno o hráči. 
		
		if humanoid then	
			humanoid.Health = 0 
		end
	end)
end
```

### Zvětšení souřadnice X u blocku

``` Lua
local part = script.Parent

for number = 1, 10 do
	part.Size = Vector3.new(part.Size.X + 1, part.Size.Y, part.Size.Z) 
	task.wait(0.5)
end
```

### Spawnování blocku v 100x100x50 rádiusu

``` Lua
while true do 
	local debris = game:GetService("Debris")
    local partCount = 0

while true do
	
	if partCount > 400 then
		break
	end

	local part = Instance.new("Part")
	local randomX = math.random(-100, 100)
	local randomZ = math.random(-100, 100)
	
	part.Parent = game.Workspace
	part.Position = Vector3.new(randomX, 50, randomZ)
	partCount = partCount + 1
	debris:AddItem(part, 20)
		
	task.wait()
end
```

### Spawnpoint

``` Lua
local spawnPart = game.Workspace:WaitForChild("SpawnPart") -- Čeká než se načte SpawnPart.
local players = game:GetService("Players") -- Vrátí objekt, který obsahuje všechny informace o hře. Je to lepší.

players.PlayerAdded:Connect(function(player) -- Na server se připojil hráč.
	player.CharacterAdded:Connect(function(character) -- Vytvoří se postava hráče.
		wait(0.1)
		character:MoveTo(spawnPart.Position + Vector3.new(0, 3, 0)) -- Přemístí postavu na pozici spawnPart a zvětší Y o 3.
	end)
end)
```

### UDim2, ofset, scale XY 

``` Lua
local text = script.Parent


task.wait(5)
print("gui has been changed")

text.Position = UDim2.new(0.5, 0, 0.5, 0)
text.Size = UDim2.new(0.25, 0, 0.25, 0)
```