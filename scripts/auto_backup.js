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
        if (exec('git add --all').code !== 0) {
            echo('Error: Git add failed');
            exit(1);
        }
        if (exec('git commit -am "Auto backup"').code !== 0) {
            echo('Error: Git commit failed');
            exit(1);
        }
        if (exec('git push origin master').code !== 0) {
            echo('Error: Git push failed');
            exit(1);
        }
        echo("+++ hexo_backup Complete")
    }

function hexo_next_backup(){
    echo("+++ hexo_next_backup start");
    cd('/Users/hy/Developments/hexo_github/themes/next'); 
    if (exec('git add --all').code !== 0) {
        echo('Error: Git add failed');
        exit(1);
    }
    if (exec('git commit -am "Auto backup"').code !== 0) {
        echo('Error: Git commit failed');
        exit(1);
    }
    if (exec('git push origin master').code !== 0) {
        echo('Error: Git push failed');
        exit(1);
    }
    echo("+++ hexo_next_backup Complete")
}