import os
import openai
import discord
import logging

from discord import Intents
from discord.ext import commands

# Replace 'your_openai_api_key' with your actual OpenAI API key
openai.api_key = 'sk-SXDmzUZwL2DMSOk5zc6WT3BlbkFJDHnvfrC5XQqqE3hOXgyTy'

# Replace 'your_discord_bot_token' with your actual Discord bot token
DISCORD_BOT_TOKEN = 'MTA5Mzc4NDc3OTkxODQzMDI0OQ.GVmIE0.o9r1y_hSnIRB6fzCsAXVQ8FTQ50F2Rdf72TPV4'

intents = Intents.default()
intents.typing = False
intents.presences = False
intents.messages = True
intents.guilds = True

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("discord")

bot = commands.Bot(command_prefix='!', intents=intents)


@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')

@bot.command()
async def ask(ctx, *, question):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"{question}\n\nGPT-4:",
        temperature=0.5,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    answer = response.choices[0].text.strip()
    await ctx.send(answer)

bot.run(DISCORD_BOT_TOKEN)
