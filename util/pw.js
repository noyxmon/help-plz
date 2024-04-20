const version = "Me Nub";
const botName = "Algoi";

function printWatermark() {
  console.log('\x1b[1m\x1b[36m╔════════════════════════════════════════════╗');
  console.log('\x1b[1m\x1b[36m║                                            ║');
  console.log(`\x1b[1m\x1b[36m              ${botName}     `);
  console.log(`\x1b[1m\x1b[36m              ${version}    `);
  console.log('\x1b[1m\x1b[36m║                                            ║');
  console.log('\x1b[1m\x1b[36m╚════════════════════════════════════════════╝\x1b[0m');
}

module.exports = {
  printWatermark,
};

