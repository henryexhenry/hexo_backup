require('shelljs/global');

try {
    hexo.on('deployAfter', function() { // deployAfter is a hexo event
        run();
    });
} catch (e) {
    console.log("error：" + e.toString());
}

function run() {
    if (!which('git')) {
        echo('require git init');
        exit(1);
    } else {
        hexo_backup();
        hexo_next_backup();
    }
}

function hexo_backup(){
    echo("+++ hexo_backup start");
        cd('/Users/hy/Developments/hexo_github');
        var git_add = exec('git add --all')
        if (git_add.code !== 0) {
            echo(git_add.stdout)
            echo('Error: Git add failed');
            exit(1);
        }
        var git_commit = exec('git commit -am "Auto backup"')
        if (git_commit.code !== 0) {
            echo(git_commit.stdout)
            echo('Error: Git commit failed');
            exit(1);
        }
        var git_push = exec('git push origin master')
        if (git_push.code !== 0) {
            echo(git_push.stdout)
            echo('Error: Git push failed');
            exit(1);
        }
        echo("+++ hexo_backup Complete")
    }

function hexo_next_backup(){
    echo("+++ hexo_next_backup start");
    cd('/Users/hy/Developments/hexo_github/themes/next'); 
    var git_add = exec('git add --all')
        if (git_add.code !== 0) {
            echo(git_add.stdout)
            echo('Error: Git add failed');
            exit(1);
        }
        var git_commit = exec('git commit -am "Auto backup"')
        if (git_commit.code !== 0) {
            echo(git_commit.stdout)
            echo('Error: Git commit failed');
            exit(1);
        }
        var git_push = exec('git push origin master')
        if (git_push.code !== 0) {
            echo(git_push.stdout)
            echo('Error: Git push failed');
            exit(1);
        }
    echo("+++ hexo_next_backup Complete")
}