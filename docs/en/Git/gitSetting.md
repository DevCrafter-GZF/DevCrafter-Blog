# Git configuration

## Git User Configuration

### 1、Configure user account
> [!TIP]
> `username` It's you own account name

```bash
git config --global user.name "username"

```

### 2、Configure user email
> [!TIP]
> `username@email.com` Email used when registering an account

```bash
git config --global user.email "username@email.com"

```

### 3、Configure user password

> [!TIP]
> `password` Password used when registering an account

```bash
git config --global user.password "password"

```

## Git operation configuration

> [!NOTE]
> `xxx` Indicates that this is a file name

### 1、Command line screen clearing

::: code-group

```[windows]bash
clear || cls

```

```[linux/mac]bash
cls

```
:::
### 2、View all configurations of Git

```bash
git config --list
```

### 3、View all global configuration items in Git

```bash
git config --list --global
```

### 4、Initialize the Git repository for the project

```bash
git init
```

### 5、View the status of files in the project

```bash
git status
```

### 6、Simplify the status of inspection files

```bash
git status -s || git status -short
```

### 7、Add files to Git local repository

```bash
git add . || git add xxx

```

### 8、Submit files to Git local repository

```bash
git commit -m "Prompt file information"
```

### 9、Skip using temporary storage area and directly transfer to warehouse

> [!important]
> Note: Newly created files cannot skip using temporary storage

```bash
git commit -a -m 'Log information remarks' 
```

### 10、Revoke modifications to the file

```bash
git checkout -- xxx

```

### 11、Cancel temporarily stored files

```bash
git reset HEAD xxx . || git reset xxx
```

### 12、Remove files (simultaneously remove workspace and repository)

```bash
git rm -f xxx
```

### 13、Remove file (repository deleted, workspace not deleted)

```bash
git rm --cache xxx   // You need to resubmit the warehouse once
```

### 14、Ignore file configuration for workspace

```bash
1、In the root directory, create `.gitignore` file
2、In `.gitignore` Ignore rule written in the file
```

### 15、Fallback version, which can specify the version to be submitted at a certain time

```bash
git reset [--soft | --mixed | --hard] commitId
```

### 16、Fallback to the specified version

```bash
git reset --hard Version repository address
```

### 17、Only search for the latest two submission histories

```bash
git log -2
```

### 18、Display all submission history on one line

```bash
git log --pretty=oneline
```

### 19、Jump to a certain version

```bash
git reset --hard <CommitID> (A certain version)
```

### 20、Associate local warehouse with remote warehouse

```bash
git remote add origin <HTTPS protocol URL>
```

### 21、Git repository cloning

```bash
git clone <Remote warehouse address> 

```

### 22、Check if there is a connection established with the remote warehouse of the project

```bash
git remote -v
```

### 23、Remove contact with the remote warehouse of the project

```bash
git remote remove origin
```

### 24、View Git local branches

```bash
git branch
```

### 25、Create a Git local branch

```bash
git branch <Local branch name>
```

### 26、Switch Git local branch

```bash
git checkout <Local branch name>
```

### 27、Create and switch Git local branches

```bash
git checkout -b <Local branch name>

```

### 28、Merge local branch to main branch

```bash
git merge <Local branch name>
```

### 29、Delete Git local branch

```bash
git branch -d <Local branch name>
```

### 30、Git local branch without performing merge operation

```bash
git branch -D <Local branch name>

```

### 31、The first push of Git remote repository

```bash
git push -u origin main
```

### 32、First push to Git remote repository, subsequent push

```bash
git push
```

### 33、Pull Git remote repository

```bash
git pull
```

### 34、git Generate SSH key from remote warehouse

```bash
ssh-keygen -t rsa -C "mailbox name "

```

### 35、Git remote repository to check if the key configuration is successful

```bash
ssh -T git@gitee.com
```

### 36、Check if Git ignores capitalization

```Bash
   git config core.ignorecase 

```

### 37、Change Git to ignore case configuration

```markdown
true：git config core.ignore case false
false： Do not perform any operations
```

