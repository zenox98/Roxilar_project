#!/bin/bash

tmux new-session -d -s Project

# backend window
tmux rename-window -t Project:1 'backend'
tmux send-keys -t Project:1 'cd backend' C-m
tmux send-keys -t Project:1 'nvim' C-m

# Frontend windows
# ====
# System Admin frontend
tmux new-window -t Project
tmux rename-window -t Project:2 'frontend sysAdmin'
tmux send-keys -t Project:2 'cd frontend/sysAdmin' C-m
tmux send-keys -t Project:2 'nvim' C-m

# ====
# Normal User frontend
tmux new-window -t Project
tmux rename-window -t Project:3 'frontend normalUser'
tmux send-keys -t Project:3 'cd frontend/normalUser' C-m
tmux send-keys -t Project:3 'nvim' C-m

# ====
# Store User frontend
tmux new-window -t Project
tmux rename-window -t Project:4 'frontend storeOwner'
tmux send-keys -t Project:4 'cd frontend/storeOwner' C-m
tmux send-keys -t Project:4 'nvim' C-m

# ====
# Dev Script
tmux new-window -t Project
tmux rename-window -t Project:5 'Dev Script'
# ---
# split window 3 horizontally
tmux split-window -h -t Project:5

# ---
# split window 3 vertically 3 times
tmux split-window -v -t Project:5.1
tmux split-window -v -t Project:5.1

# pane 4.1
tmux send-keys -t Project:5.1 'cd frontend/sysAdmin' C-m
tmux send-keys -t Project:5.1 'npm run dev' C-m

# pane 4.2
tmux send-keys -t Project:5.2 'cd frontend/normalUser' C-m
tmux send-keys -t Project:5.2 'npm run dev' C-m

# pane 4.3
tmux send-keys -t Project:5.3 'cd frontend/storeOwner' C-m
tmux send-keys -t Project:5.3 'npm run dev' C-m

# pane 4.4
tmux send-keys -t Project:5.4 'cd backend' C-m
tmux send-keys -t Project:5.4 'npm run dev' C-m

# ====
# lazygit window
tmux new-window -t Project
tmux send-keys -t Project:6 'lazygit' C-m

# Attach to the session
tmux attach-session -t Project
