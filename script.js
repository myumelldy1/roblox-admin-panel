local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")


local SUPABASE_URL =
"https://ygwkmanjkiuachkmhkbh.supabase.co"


local SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnd2ttYW5qa2l1YWNoa21oa2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjgxNDIsImV4cCI6MjA5OTU0NDE0Mn0.bE15mcFyl6ZDRXc8Xpu_oh5Aetd_CmAdLNm8qUryQhw"



local playerLogs = {}



-- PLAYER JOIN

Players.PlayerAdded:Connect(function(player)


	local joinTime =
	os.date("!%Y-%m-%dT%H:%M:%SZ")



	local data = {


		displayname = player.DisplayName,


		username = player.Name,


		userid = player.UserId,


		join_time = joinTime


	}



	local response =
	HttpService:RequestAsync({

		Url = SUPABASE_URL,


		Method = "POST",


		Headers = {

			["apikey"] = SUPABASE_KEY,


			["Authorization"] =
			"Bearer "..SUPABASE_KEY,


			["Content-Type"] =
			"application/json",


			["Prefer"] =
			"return=representation"

		},


		Body =
		HttpService:JSONEncode(data)

	})



	if response.Success then


		local result =
		HttpService:JSONDecode(response.Body)



		playerLogs[player.UserId] = result[1].id



		print(
		"Player masuk:",
		player.Name
		)


	end


end)




-- PLAYER LEAVE

Players.PlayerRemoving:Connect(function(player)


	local logID =
	playerLogs[player.UserId]



	if logID then



		local leaveTime =
		os.date("!%Y-%m-%dT%H:%M:%SZ")



		HttpService:RequestAsync({


			Url =
			SUPABASE_URL
			.."?id=eq."
			..logID,



			Method = "PATCH",



			Headers = {


				["apikey"] =
				SUPABASE_KEY,


				["Authorization"] =
				"Bearer "..SUPABASE_KEY,


				["Content-Type"] =
				"application/json"

			},



			Body =
			HttpService:JSONEncode({

				leave_time =
				leaveTime

			})

		})



		print(
		"Player keluar:",
		player.Name
		)


	end


end)
