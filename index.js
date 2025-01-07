const { exec } = require( 'child_process' );
const readline = require( 'readline' );

const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout
} );

rl.question( 'Enter the Wi-Fi profile name: ', ( profileName ) =>
{
  const command = `netsh wlan show profile "${profileName}" key=clear`;

  exec( command, ( error, stdout, stderr ) =>
  {
    if ( error )
    {
      console.error( `exec error: ${error}` );
      rl.close();
      return;
    }
    if ( stderr )
    {
      console.error( `stderr: ${stderr}` );
      rl.close();
      return;
    }
    const regex = /Key Content\s*:\s*(.+)/;
    const match = stdout.match( regex );
    if ( match )
    {
      console.log( `Wi-Fi Password: ${match[ 1 ]}` );
    } else
    {
      console.log( 'No "Key Content" found. Make sure the profile has a password.' );
    }
    // rl.close();
  } );
} );
