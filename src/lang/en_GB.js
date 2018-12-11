export default {
  'tip': {
    'title': 'Tips',
    'not_same': 'Two secrets are inconsistent.',
    'balance_enough': 'Insufficient Balance',
    'set_success': 'Set Success',
    'transfer_success': 'Transfer Success',
    'vote_success': 'Vote Success',
    'delete_success': 'Delete Success',
    'register_success': 'Register Success',
    'choose_vote': 'Select a delegate',
    'delete_vote': 'Select a delete to record',
    'hightest': 'Maximum height reached',
    'lowest': 'Minimum height reached',
    'empty_hight': 'Height cannot be empty',
    'lock_success': 'Locked Successfully',
    'unlock_success': 'Unlocked Successfully',
    'unlock_error': 'Please select the lock item'
  },
  'login': {
    'placeholder': 'Type the master secret',
    'status': 'Keep me logged in',
    'select': {
      'zh_CN': 'Chinese',
      'en_GB': 'English'
    },
    'loginBtn': 'Login',
    'registerBtn': 'New Account',
    'tip_err': 'Secret format does not match',
    'tip_success': 'Login Success',
    'tip_fail': 'Login Fail'
  },
  'register': {
    'title': 'The master secret is generated locally by the browser. Please back it up and save it.',
    'placeholder': 'Copy or enter the master secret above.',
    'checkitem': 'I understand that if I lose my master secret, I will never be able to access my assets. | I understand that if I forget or lose my master secret, no one can help me recover it. | I have written down or saved my master secret in other ways.',
    'returnBtn': 'Back',
    'create': 'Create Master Secret',
    'tip_err_limit': 'Please read carefully and tick the instructions.',
    'tip_err_same': 'The entered master secret is inconsistent.'
  },
  'router': {
    'home': 'Home',
    'person': 'My Account',
    'app': 'DApp Store',
    'block_production': 'Block Production',
    'block_scan': 'Block Listing',
    'vote': 'Vote',
    'transfer': 'Transfer',
    'tip_success': 'Exit Success',
    'loginOutTitle': 'Exit'

  },
  'first-view': {
    'information': 'Balance | Latest Block Height | Version ',
    'transaction': 'Transfer Record',
    'table_columns': {
      'th01': 'ID',
      'th02': 'Type',
      'th03': 'Sender',
      'th04': 'Receiver',
      'th05': 'Date',
      'th06': 'Remark',
      'th07': 'Amount(ETM)'
    },
    'transfer': 'Ordinary transfer',
    'set': 'Set secondary password',
    'register_voter': 'Registered trustee',
    'vote': 'vote',
    'multi_signature': 'Multi signature',
    'all': 'Total',
    'lock': 'lock',
    'unlock': 'unlock'
  },
  'person': {
    'tab': 'Account Detail | Second Secret | Lock Setting'
  },
  'account': {
    'title': 'Account Detail',
    'QRcode': 'QRcode',
    'secretStatus': {
      'hasSet': 'Setted',
      'notSet': 'Unset'
    },
    'lockedStatus': {
      'hasSet': 'Locked',
      'notSet': 'Unlock'
    },
    'info': {
      'balance': 'Balance',
      'address': 'Address',
      'secondSecret': 'Second Secret',
      'status': 'Lock',
      'publicKey': 'PublicKey',
      'keyCode': 'QRcode of PublicKey',
      'addressCode': 'QRcode of Address'
    },
    'click': 'Get QRcode'
  },
  'second_password': {
    'password': {
      'label': 'Secret',
      'msg': 'Please enter a combination of letters and numbers, with a minimum of 1 and a maximum of 100'
    },
    'confirm_password': {
      'label': 'Confirm Secret',
      'msg': 'Please enter again'
    },
    'note': 'Notice',
    'p': 'Please confirm that you have safely saved the second secret. Once lost, your property in the ETM system will not be retrieved. Setting the second secret requires 5 ETM fee.',
    'submitBtn': 'Submit'
  },
  'lock_up': {
    'lockedModel': {
      'label': 'Lock Amount',
      'msg': 'Please enter the amount of the lock',
      'title': 'New Lock',
      'fee': 'Locking the warehouse is subject to payment 0.1 ETM',
      'note': 'The right to vote is obtained by locking the position. The amount of the locked position determines the final voting equity (number of votes). After the time coefficient gain, the convex function is evenly processed, which increases the long-term holdings of the small voter and reduces the weight of the oligarchy. Details'
    },
    'btn_add': 'New Lock',
    'bulk_unlock': 'Bulk Unlock',
    'choose': 'Chosen',
    'item': '',
    'note': 'Note',
    'total': 'Total lock amount',
    'clear': 'Clear',
    'unlock': 'Unlock',
    'colums': {
      'th01': 'Lock Time',
      'th02': 'Lock Amount (ETM)',
      'th03': 'Time Gain Factor',
      'th04': 'operate'
    },
    'tip': {
      'title': 'Do you need to unlock?',
      'content': 'Need to charge 0.1ETM fee',
      'btn_ok': 'ok',
      'btn_cancel': 'cancel'
    }

  },
  'application': {
    'app_list': 'DApp List | Installed',
    'create_new': 'Create New DApp',
    'app': {
      'title': 'Epony Horse',
      'content': 'Epony Horse is a mechanical horse game with unique genomes based on the block-chain En-Tan-Mo. Players can open the horse containers, breed, sell and rent, obtain dividends, join horse racing in this game.',
      'btn01': 'Website',
      'btn02': 'Recharge',
      'btn03': 'Cash'
    }
  },
  'block_production': {
    'status': {
      'has_register': 'Registered',
      'not_register': 'Unregistered'
    },
    'info': 'Delegate Information',
    'registerBtn': 'Register',
    'rewards': 'Rewards',
    'rate': 'Ranking',
    'productivity': 'Productivity',
    'approval': 'Approval Rate',
    'block_list': 'My Produced Blocks',
    'columns': {
      'th01': 'Height',
      'th02': 'Date',
      'th03': 'ID',
      'th05': 'Transaction',
      'th06': 'Amount (ETM)',
      'th07': 'Fee (ETM)',
      'th08': 'Rewards (ETM)'
    },
    'pop_title': 'Register as Delegate',
    'name': {
      'label': 'Delegate Name',
      'msg': 'Username can not be empty',
      'required': 'Username can only contain letters, numbers, characters other than @$&_'
    },
    'note': {
      'label': 'Notice',
      'msg': 'Registration requires 100 ETM fee'
    },
    'submitBtn': 'Submit'
  },
  'block_scan': {
    'search': 'Height of Search',
    'click_details': 'Detail',
    'block_details': 'Block Detail',
    'next_block': 'Next Block',
    'pre_block': 'Previous Block',
    'version': 'Version',
    'timestamp': 'Time',
    'height': 'Height',
    'previousBlock': 'Previous Block',
    'numberOfTransactions': 'Transaction',
    'totalAmount': 'Amount',
    'reward': 'Rewards',
    'summary': 'Summary',
    'generatorId': 'Producer',
    'generatorPublicKey': 'PublicKey',
    'columns': {
      'th01': 'Height',
      'th02': 'Date',
      'th03': 'ID',
      'th04': 'Producer',
      'th05': 'Transaction',
      'th06': 'Amount (ETM)',
      'th07': 'Fee (ETM)',
      'th08': 'Rewards (ETM)',
      'th09': 'Operate'
    }
  },
  'vote': {
    'tab': 'Delegate List | Vote Record | My Voters'
  },
  'vote_lists': {
    'total': 'A total of | delegate',
    'refresh': 'Refresh',
    'vote': 'Vote',
    'columns': {
      'th01': 'Ranking',
      'th02': 'Delegate',
      'th03': 'Address',
      'th04': 'Approval',
      'th05': 'Produced Blocks',
      'th06': 'Productivity'
    }
  },
  'vote_record': {
    'total': 'A total of | records',
    'refresh': 'Refresh',
    'delete': 'Delete',
    'columns': {
      'th01': 'Ranking',
      'th02': 'Delegate',
      'th03': 'Address',
      'th04': 'Approval',
      'th05': 'Produced Blocks',
      'th06': 'Productivity'
    }
  },
  'vote_for_me': {
    'total': 'A total of | voters',
    'refresh': 'Refresh',
    'columns': {
      'th01': 'Username',
      'th02': 'Address',
      'th03': 'Weights'
    }
  },
  'transfer': {
    'sender': 'Sender',
    'reciped': {
      'label': 'Receiver',
      'msg': 'Please enter the receiver address'
    },
    'amount': {
      'label': 'Amount',
      'msg': 'Please enter the transfer amount'
    },
    'fee': 'Fee',
    'remark': {
      'label': 'Remark',
      'msg': 'Please enter the remark'
    },
    'note': {
      'label': 'Notice',
      'msg': 'Please make sure that you are sending ETM to the correct address. This operation cannot be undone.'
    },
    'submitBtn': 'Submit'
  },
  'pop_voted': {
    'cancel_vote': 'Cancel Vote',
    'new_vote': 'New Vote',
    'note': 'Voting requires 0.1 ETM fee',
    'submitBtn': 'Submit'
  },
  'pop_password': {
    'title': 'Please enter second secret',
    'secondSecret': {
      'label': 'Second Secret',
      'msg': 'Second secret cannot be empty',
      'placeholder': 'Please enter second secret'
    },
    'submitBtn': 'Submit'
  },
  'no_data': {
    'p': 'Sorry, the page you visited does not exist.',
    'returnBtn': 'Return Home'
  },
  'no_found': {
    'p': 'Sorry, no relevant data yet.'
  }
}
